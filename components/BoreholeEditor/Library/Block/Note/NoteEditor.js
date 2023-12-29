import { Edit } from "./../Generic/index";
import EditBlock from "./../Generic/Wrapper";
import TitleInput from "./../../../../common/DataEntry/TitleInput/";
import DescriptionInput from "./../../../../common/DataEntry/DescriptionInput/";

import Label from "./../../../../common/Label";

const NoteEditor = ({ data, onUpdate, idx }) => {
  const { description, title } = data;
  return (
    <Edit>
      <EditBlock title={"Details"}>
        <TitleInput
          heading={"Heading"}
          title={title}
          onUpdate={onUpdate}
          data={data}
          placeholder={"Notes Heading"}
        />
        <DescriptionInput
          heading={"Notes"}
          description={description}
          onUpdate={onUpdate}
          data={data}
          placeholder={"Field Notes (if any)"}
        />
      </EditBlock>
    </Edit>
  );
};
export default NoteEditor;
