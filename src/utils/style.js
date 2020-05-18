import Color from 'color'

export function getColor(colorCode) {
  let color = colorCode

  try {
    color = Color(color)
  } catch (e) {
    console.error(e)
    color = Color('#000000')
  }
  return color
}

export function getButtonStyle(colorCode) {
  const color = getColor(colorCode)

  return {
    color: color.rgb().string(),
    shadow1: Color({ alpha: 0.4, ...color.object() })
      .rgb()
      .string(),
    shadow2: Color({ alpha: 0.24, ...color.object() })
      .rgb()
      .string(),
    hoverBackground: Color({ alpha: 0.15, ...color.object() })
      .rgb()
      .string(),
  }
}
