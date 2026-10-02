import pypdfium2 as pdfium
import sys

sys.stdout.reconfigure(encoding="utf-8")
pdf = pdfium.PdfDocument("public/Sourabh_Ambarshetti_Resume.pdf")
print("Total pages:", len(pdf))
for i, page in enumerate(pdf):
    text = page.get_textpage().get_text_range()
    print(f"Page {i+1}: {len(text)} characters extracted")
print("First 150 chars:", pdf[0].get_textpage().get_text_range()[:150].strip())
