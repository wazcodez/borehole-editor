import BlockRowEdit from "./../BlockRowEdit";
import Label from "./../../../../common/Label";
import ParamSelectableUnit from "../../../../common/DataEntry/ParamSelectableUnit/v2";
import moment from "moment";
import TableInput from "./../../../../common/DataEntry/TableInput/";
import SelectBar from "../../../../common/DataEntry/SelectBar/v2";
import { DateInput } from "@blueprintjs/datetime";
import { TimePrecision } from "@blueprintjs/datetime";

const WELL_PIPE_OPTIONS = ['Screen', 'Solid Riser', 'No Pipe'].map(i => ({title: i}))
const WELL_BACKFILL_OPTIONS = ['Bentonite', 'Sand', 'Drill cuttings', 'Grout', 'Casing', 'Cement'].map(i => ({title: i}))

const WellLogEditor = ({ data, onUpdate, idx }) => {
  const { installation_date } = data;
  var installedDate =
    installation_date === null ? null : moment(installation_date).toDate();
  return (
    <div className="flex flex-col mt-0 justify-start w-full max-w-lg">
      <BlockRowEdit title={"Details"}>
        <div className="pl-1">
        <SelectBar
            data={{ ...data }}
            heading={"Well Use"}
            value={data.well_use}
            onUpdate={onUpdate}
            valueKey={"well_use"}
            _options={[
              { title: "Monitoring", value: "Monitoring" },
              {
                title: "Dewatering",
                value: "Dewateirng",
              },
              {
                title: "Municipal",
                value: "Municipal",
              },
              {
                title: "Commercial",
                value: "Commerical",
              },
              {
                title: "Industiral",
                value: "Industrial",
              },
              {
                title: "Test Hole",
                value: "Test Hole",
              },
              {
                title: "Public",
                value: "Public",
              },
              {
                title: "Domestic",
                value: "Domestic",
              },
              {
                title: "Livestock",
                value: "Livestock",
              },
              {
                title: "Irrigation",
                value: "Irrigation",
              },
              {
                title: "Cooling & Air Conditioning",
                value: "Cooling & Air Conditioning",
              },
              {
                title: "Other",
                value: "Other",
              },
            ]}
          />
          <SelectBar
            data={{ ...data }}
            heading={"Well Type"}
            value={data.well_type}
            onUpdate={onUpdate}
            valueKey={"well_type"}
            _options={[
              { title: "Standpipe", value: "Standpipe" },
              {
                title: "Vibrating Wire Piezometer",
                value: "Vibrating Wire Piezometer",
              },
            ]}
          />
          <SelectBar
            data={{ ...data }}
            heading={"Plug Type"}
            value={data.plug_type}
            onUpdate={onUpdate}
            valueKey={"plug_type"}
            _options={[
              { title: "No plug", value: "No plug" },
              { title: "J-plug", value: "J-plug" },
              {
                title: "Locking well cap (PVC)",
                value: "Locking well cap (PVC)",
              },
              {
                title: "Locking well cap (Steel)",
                value: "Locking well cap (Steel)",
              },
              { title: "PVC cap", value: "PVC cap" },
            ]}
          />
          <SelectBar
            data={{ ...data }}
            heading={"Well Casing"}
            value={data.well_casing}
            onUpdate={onUpdate}
            valueKey={"well_casing"}
            _options={[
              { title: "Monument casing", value: "Monument casing" },
              { title: "Flush mounted casing", value: "Flush mounted casing" },
            ]}
          />
          <SelectBar
            data={{ ...data }}
            heading={"Depth Unit"}
            value={data.depth_unit}
            onUpdate={onUpdate}
            valueKey={"depth_unit"}
            _options={[
              { title: "m", value: "m" },
              { title: "ft", value: "ft" },
            ]}
          />
          <Label title={"Installation Date"} />
          <div className="flex flex-row flex-wrap w-full align-middle items-center">
            <DateInput
              formatDate={(date) =>
                moment(date).format("MMMM DD, YYYY hh:mm A")
              }
              onChange={(val) => {
                onUpdate({
                  ...data,
                  installation_date: val,
                });
              }}
              fill={true}
              parseDate={(s) => new Date(s)}
              placeholder={"DD-MM-YYYY"}
              value={
                installation_date === null
                  ? null
                  : moment(installation_date).toDate()
              }
              timePrecision={TimePrecision.MINUTE}
            />
          </div>
          <Label title={"Well Installation Details"}></Label>
            <TableInput
              cols={[`Start Depth`, `End Depth`, "Well Pipe", "Backfill"]}
              columnWidths={[100, 90, 90, 90]}
              data={{ ...data }}
              onUpdate={onUpdate}
              dropdownOptions={{
                'Well Pipe': WELL_PIPE_OPTIONS,
                'Backfill': WELL_BACKFILL_OPTIONS
              }}
            ></TableInput>
        </div>
      </BlockRowEdit>
    </div>
  );
};

export default WellLogEditor;
