interface Measurement {
  quantity?: number,
  quantityText?: string,
  unitText?: string,
}

export default function parse(input: string) : {
  measurement? : Measurement,
  alternateMeasurement?: Measurement,
};