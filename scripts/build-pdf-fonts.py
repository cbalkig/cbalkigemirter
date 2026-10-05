"""Builds the static fonts in pdf-fonts/ that generate-pdf.js embeds in the designed CV.

Chrome embeds variable web fonts as Type 3 fonts, which many applicant tracking systems cannot read,
so the PDF uses static instances instead. Outfit-Bold-Heading has the section-heading letter-spacing
baked into its advance widths: CSS letter-spacing makes text extractors split headings into single
letters ("E D U C AT I O N").

One-off; rerun only to change the fonts:  pip install fonttools  &&  python scripts/build-pdf-fonts.py
"""
import io
import subprocess
from pathlib import Path

from fontTools.subset import Options, Subsetter
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

SRC = 'https://github.com/google/fonts/raw/main/ofl/'
OUT = Path(__file__).resolve().parent.parent / 'pdf-fonts'
# Latin incl. Turkish, punctuation, a few symbols.
UNICODES = [*range(0x20, 0x250), *range(0x2000, 0x2070), 0x20AC, 0x2122, 0x2190, 0x2191, 0x2192, 0x2193, 0x2212]
HEADING_SPACING = 0.16  # em; h2 letter-spacing (2px at 12.5px)

FONTS = [
    ('outfit/Outfit%5Bwght%5D.ttf', {'wght': 600}, 'Outfit-SemiBold', 0),
    ('outfit/Outfit%5Bwght%5D.ttf', {'wght': 700}, 'Outfit-Bold', 0),
    ('outfit/Outfit%5Bwght%5D.ttf', {'wght': 700}, 'Outfit-Bold-Heading', HEADING_SPACING),
    ('inter/Inter%5Bopsz,wght%5D.ttf', {'opsz': 14, 'wght': 400}, 'Inter-Regular', 0),
    ('inter/Inter%5Bopsz,wght%5D.ttf', {'opsz': 14, 'wght': 600}, 'Inter-SemiBold', 0),
]

OUT.mkdir(exist_ok=True)
sources = {}
for path, axes, name, spacing in FONTS:
    if path not in sources:
        sources[path] = subprocess.run(['curl', '-sfL', SRC + path], capture_output=True, check=True).stdout
    font = instancer.instantiateVariableFont(TTFont(io.BytesIO(sources[path])), axes)
    options = Options()
    options.layout_features = ['*']
    subsetter = Subsetter(options)
    subsetter.populate(unicodes=UNICODES)
    subsetter.subset(font)
    if spacing:
        extra = round(spacing * font['head'].unitsPerEm)
        hmtx = font['hmtx']
        for glyph, (advance, lsb) in hmtx.metrics.items():
            if advance:
                hmtx[glyph] = (advance + extra, lsb)
    for record in font['name'].names:
        if record.nameID in (4, 6):
            record.string = name
    font.save(OUT / f'{name}.ttf')
    print(name, (OUT / f'{name}.ttf').stat().st_size)
