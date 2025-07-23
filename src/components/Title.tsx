interface TitleProp {
  title: string;
}
export default function Title({ title }: TitleProp) {
  return <h2 className="title">{title}</h2>;
}
