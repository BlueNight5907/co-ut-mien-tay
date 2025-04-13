export type DynamicRichTextProps = {
  headline?: string;
  content?: string;
};
export function DynamicRichText(props: DynamicRichTextProps) {
  const { headline, content } = props;

  return (
    <div className="flex flex-col gap-2">
      {headline && <h3 className="font-semibold text-md">{headline}</h3>}
      {content && <div className="richtext" dangerouslySetInnerHTML={{ __html: content }}></div>}
    </div>
  );
}
