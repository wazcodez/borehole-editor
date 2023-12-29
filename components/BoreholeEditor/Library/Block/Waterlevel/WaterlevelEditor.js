import BlockRowEdit from "./../BlockRowEdit";
import Label from "./../../../../common/Label";
import ParamSelectableUnit from "../../../../common/DataEntry/ParamSelectableUnit/v2";
import DescriptionInput from "./../../../../common/DataEntry/DescriptionInput/";
import EditBlock from "./../Generic/Wrapper";
import moment from "moment";

import { DateInput } from "@blueprintjs/datetime";
import { TimePrecision } from "@blueprintjs/datetime";

const WaterlevelEditor = ({ data, onUpdate, idx }) => {
  const { measurement_date } = data;
  var measuredDate =
    measurement_date === null ? null : moment(measurement_date).toDate();
  return (
    <div className="flex flex-col mt-0 justify-start w-full max-w-lg">
      <BlockRowEdit title={"Details"}>
        <div className="pl-1">
          <ParamSelectableUnit
            heading={"Water level Depth"}
            data={{ ...data }}
            value={data.depth}
            onUpdate={onUpdate}
            valueKey="depth"
            unitKey="depth_unit"
            defaultOption={data.depth_unit}
            _options={[
              { value: "m", title: "m" },
              { value: "ft", title: "ft" },
              { value: "in", title: "in" },
              { value: "cm", title: "cm" },
              { value: "mm", title: "mm" },
            ]}
          />
          <Label title={"Measurement Date"} />
          <div className="flex flex-row flex-wrap w-full align-middle items-center">
            <DateInput
              formatDate={(date) =>
                moment(date).format("MMMM DD, YYYY hh:mm A")
              }
              onChange={(val) => {
                onUpdate({
                  ...data,
                  measurement_date: val,
                });
              }}
              fill={true}
              parseDate={(s) => new Date(s)}
              placeholder={"DD-MM-YYYY"}
              value={
                measurement_date === null
                  ? null
                  : moment(measurement_date).toDate()
              }
              timePrecision={TimePrecision.MINUTE}
            />
          </div>
        </div>
      </BlockRowEdit>
      <EditBlock title={"Notes"}>
        <DescriptionInput
          heading={"Notes"}
          description={data.description}
          onUpdate={onUpdate}
          data={data}
          placeholder={"Measurement notes (if any)"}
        />
      </EditBlock>
    </div>
  );
};

export default WaterlevelEditor;
