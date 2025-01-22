interface IconProps {
  iconName: string;
  fontSize?: number;
  className?: string;
}

export default function Icon({iconName, fontSize = 32, className}: IconProps) {
  return (
    <span
      className={"material-symbols-outlined " + className}
      style={{fontSize: `${fontSize}px`}}>
            {iconName}
    </span>
  )
}