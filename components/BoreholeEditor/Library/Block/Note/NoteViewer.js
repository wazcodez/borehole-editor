import BlockRowViewLayout from "./../BlockRowViewLayout";
import Icon from "./../../../../common/Icon";

const NoteViewer = ({ data }) => {
  const { title, description } = data;

  const icon =
    title || description ? (
      <Icon name={"notes"} />
    ) : (
      <Icon name={"notes"} style={"text-gray-500"} />
    );
  const heading = title ? (
    <h2 className="pr-2 border-r border-gray-200">{title}</h2>
  ) : (
    <h2 className="pr-2 border-r border-gray-200 text-gray-500">
      Notes Heading
    </h2>
  );
  const subtext = description ? (
    <p className="text-xs whitespace-pre-wrap">{description}</p>
  ) : (
    <p className="text-xs text-gray-500">Field notes... </p>
  );
  return (
    <BlockRowViewLayout icon={icon}>
      <div className="flex flex-col flex-wrap">
        <div className="flex flex-row flex-wrap">{heading}</div>
        <div className="flex flex-row flex-wrap ">{subtext}</div>
      </div>
    </BlockRowViewLayout>
  );
};
export default NoteViewer;
