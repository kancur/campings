interface SimpleObject {
  [key: string | number]: string | number | undefined | null;
}

interface StringObject {
  [key: string | number]: string;
}

export default function convertObjValuesToStrings(obj: SimpleObject): StringObject {
  const copy: any = { ...obj };
  Object.keys(copy).forEach((key) => {
    if (typeof copy[key] === 'object') {
      return convertObjValuesToStrings(copy[key]);
    }
    copy[key] = copy[key] + '';
  });
  return copy;
}
