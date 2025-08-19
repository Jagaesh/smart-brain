export const calculateFaceLocation = (regions) => {
  const image = document.getElementById('input-image');
  if (!image || !regions) return [];

  const width = Number(image.width);
  const height = Number(image.height);

  return regions.map(region => {
    const boundingBox = region.region_info.bounding_box;
    return {
      topRow: boundingBox.top_row * height,
      leftCol: boundingBox.left_col * width,
      bottomRow: height * (1 - boundingBox.bottom_row),
      rightCol: width * (1 - boundingBox.right_col)
    };
  });
};
