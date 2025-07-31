export const calculateFaceLocation = (result) => {
  const image = document.getElementById('input-image');
  if (!image || !result?.outputs?.[0]?.data?.regions) return [];

  const width = Number(image.width);
  const height = Number(image.height);
  const regions = result.outputs[0].data.regions;

  return regions.map(region => {
    const boundingBox = region.region_info.bounding_box;
    return {
      topRow: boundingBox.top_row * height,
      leftCol: boundingBox.left_col * width,
      bottomRow: height * (1 - boundingBox.bottom_row),
      rightCol: width * (1 - boundingBox.right_col)
    };
  })[0];
};
