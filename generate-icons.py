#!/usr/bin/env python3
"""
PWA Icon Generator Script
Converts your logo into properly sized PWA icons
"""

from PIL import Image
import os

# Configuration
INPUT_IMAGE = "images/Pet-Veterinary-Logo-Design-1.jpg"
OUTPUT_DIR = "images"

# PWA icon sizes (width, height)
ICON_SIZES = [
    (72, 72),
    (96, 96),
    (128, 128),
    (144, 144),
    (152, 152),
    (192, 192),   # Required minimum
    (384, 384),
    (512, 512),   # Required for splash screens
]

def generate_icons():
    """Generate PWA icons from source image"""
    
    # Check if input file exists
    if not os.path.exists(INPUT_IMAGE):
        print(f"❌ Error: Input image not found: {INPUT_IMAGE}")
        return
    
    # Create output directory if it doesn't exist
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    # Open the source image
    print(f"📂 Loading image: {INPUT_IMAGE}")
    try:
        img = Image.open(INPUT_IMAGE)
        print(f"✅ Image loaded: {img.size[0]}x{img.size[1]} pixels")
    except Exception as e:
        print(f"❌ Error loading image: {e}")
        return
    
    # Convert to RGBA if needed (for transparency support)
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    # Generate each icon size
    print("\n🔄 Generating icons...")
    for width, height in ICON_SIZES:
        output_filename = f"icon-{width}x{height}.png"
        output_path = os.path.join(OUTPUT_DIR, output_filename)
        
        # Resize image (using LANCZOS for high quality)
        resized = img.resize((width, height), Image.Resampling.LANCZOS)
        
        # Save as PNG
        resized.save(output_path, 'PNG', optimize=True)
        
        # Get file size
        file_size = os.path.getsize(output_path)
        file_size_kb = file_size / 1024
        
        print(f"  ✅ {output_filename} ({file_size_kb:.1f} KB)")
    
    print("\n🎉 All icons generated successfully!")
    print(f"\n📁 Icons saved to: {OUTPUT_DIR}/")
    print("\n📝 Next steps:")
    print("1. Check the generated PNG files in the images folder")
    print("2. Update manifest.json (let me know when ready)")
    print("3. Push to GitHub")
    print("4. Users reinstall PWA to see new icons")

if __name__ == "__main__":
    print("="*50)
    print("   PWA Icon Generator")
    print("   World Conquest Veterinary Home")
    print("="*50)
    print()
    
    try:
        generate_icons()
    except ImportError:
        print("❌ Error: Pillow library not installed!")
        print("\n📦 To install Pillow, run:")
        print("   pip install Pillow")
        print("\nThen run this script again:")
        print("   python generate-icons.py")
    except Exception as e:
        print(f"❌ An error occurred: {e}")
