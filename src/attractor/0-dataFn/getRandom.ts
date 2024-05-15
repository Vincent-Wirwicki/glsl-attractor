export const getRandom = (numPoints: number, sc: number = 5) => {
  const size = numPoints * numPoints * 4;
  const data = new Float32Array(size);

  for (let i = 0; i < size; i++) {
    const stride = i * 4;
    // const x = Math.random() * 2 - 1;
    // const y = Math.random() * 2 - 1;
    // const z = Math.random() * 2 - 1;

    const x = Math.random() * sc - 0.5;
    const y = Math.random() * sc - 0.5;
    const z = Math.random() * sc - 0.5;

    data[stride] = x;
    data[stride + 1] = y;
    data[stride + 2] = z;
    data[stride + 3] = 1;
  }

  return data;
};

export const getRandom2d = (numPoints: number) => {
  const size = numPoints * numPoints * 4;
  const data = new Float32Array(size);

  for (let i = 0; i < size; i++) {
    const stride = i * 4;
    const x = Math.random() * 2 - 1;
    const y = Math.random() * 2 - 1;
    const z = 1;

    data[stride] = x;
    data[stride + 1] = y;
    data[stride + 2] = z;
    data[stride + 3] = 1;
  }

  return data;
};

export const getRandomPI = (numPoints: number) => {
  const size = numPoints * numPoints * 4;
  const data = new Float32Array(size);

  for (let i = 0; i < size; i++) {
    const stride = i * 4;
    //between 0 and 2π
    const x = Math.PI * Math.random() * 2;
    const y = Math.PI * Math.random() * 2;
    const z = Math.PI * Math.random() * 2;

    data[stride] = x;
    data[stride + 1] = y;
    data[stride + 2] = z;
    data[stride + 3] = 1;
  }
  return data;
};
