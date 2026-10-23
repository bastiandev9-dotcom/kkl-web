const photos = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
});

export function resolvePhoto(path?: string): ImageMetadata | undefined {
  if (!path) {
    return undefined;
  }

  const filename = path.split(/[\\/]/).pop();

  if (!filename) {
    return undefined;
  }

  return photos[`../assets/photos/${filename}`]?.default;
}
