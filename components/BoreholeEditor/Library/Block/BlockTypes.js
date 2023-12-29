import { Icon } from "./../../../common/Icon";
import Weather from "./Weather";
import Note from "./Note";
import Lithology from "./Lithology";
import WaterLevel from "./Waterlevel";
import Location from "./Location";
import Sample from "./Sample";
import SamplePoint from "./SamplePoint";

import Moisture from "./Moisture";
import SoilpH from "./SoilpH";
import WaterpH from "./WaterpH";
import SpecificGravity from "./SpecificGravity";
import SoilResistivityField from "./SoilResistivityField";
import CaliforniaBearingRatio from "./CaliforniaBearingRatio";
import Contamination from "./Contamination";
import WaterTemprature from "./WaterTemprature";
import FallingHeadTest from "./FallingHeadTest";
import RisingHeadTest from "./RisingHeadTest";
import PackerTest from "./PackerTest";
import PumpingTest from "./PumpingTest";
import RQD from "./RQD";
import AtterbergTest from "./AtterbergTest";
import SlakeDurability from "./SlakeDurability";
import PointLoadTest from "./PointLoadTest";
import Triaxial from "./Triaxial";
import Defect from "./Defect";
import Drilling from "./Drilling";
import Density from "./Density";
import GrainSizeDistribution from "./GrainSizeDistribution";
import SPT from "./SPT";
import Consolidation from "./Consolidation";
import UnitWeight from "./UnitWeight";
import UCS from "./UCS";
import PocketPenetrometer from "./PocketPenetrometer";
import FieldVane from "./FieldVane";
import SoilVapour from "./SoilVapour";
import SoilEC from "./SoilEC";
import Drillers from "./Drillers";
import WellLog from "./WellLog";

export const BlockTypes = {
  Location: Location,
  SpecificGravity: SpecificGravity,
  SoilResistivityField: SoilResistivityField,
  CaliforniaBearingRatio: CaliforniaBearingRatio,
  SoilpH: SoilpH,
  WaterpH: WaterpH,
  WaterTemprature: WaterTemprature,
  WellLog: WellLog,
  Contamination: Contamination,
  FallingHeadTest: FallingHeadTest,
  RisingHeadTest: RisingHeadTest,
  PackerTest: PackerTest,
  PumpingTest: PumpingTest,
  AtterbergTest: AtterbergTest,
  SlakeDurability: SlakeDurability,
  PointLoadTest: PointLoadTest,
  Triaxial: Triaxial,
  Defect: Defect,
  RQD: RQD,
  Drilling: Drilling,
  Density: Density,
  GrainSizeDistribution: GrainSizeDistribution,
  SPT: SPT,
  UCS: UCS,
  Consolidation: Consolidation,
  UnitWeight: UnitWeight,
  PocketPenetrometer: PocketPenetrometer,
  FieldVane: FieldVane,
  Drillers: Drillers,
  // Drilling: {
  //   type: "drilling",
  //   icon: <Icon name="drilling" />,
  //   multipleAllowed: false,
  //   schema: null,
  //   view: (data) => {
  //     return <div>{`Not Implemented!`}</div>;
  //   },
  //   editor: (data, onUpdate, idx) => {
  //     return <div>{`Not Implemented!`}</div>;
  //   },
  // },
  Crew: {
    type: "crew",
    icon: <Icon name="crew" />,
    multipleAllowed: false,
    schema: null,
    view: (data) => {
      return <div>{`Not Implemented!`}</div>;
    },
    editor: (data, onUpdate, idx) => {
      return <div>{`Not Implemented!`}</div>;
    },
  },
  Note: Note,
  Weather: Weather,
  Sample: Sample,
  SamplePoint: SamplePoint,
  Media: {
    type: "media",
    icon: <Icon name="media" />,
    multipleAllowed: false,
    schema: null,
    view: (data) => {
      return <div>{`Not Implemented!`}</div>;
    },
    editor: (data, onUpdate, idx) => {
      return <div>{`Not Implemented!`}</div>;
    },
  },
  OrganicContent: {
    type: "organics",
    icon: <Icon name="organics" />,
    multipleAllowed: false,
    schema: null,
    view: (data) => {
      return <div>{`Not Implemented!`}</div>;
    },
    editor: (data, onUpdate, idx) => {
      return <div>{`Not Implemented!`}</div>;
    },
  },
  Lithology: Lithology,
  // Lithology: {
  //   type: "lithology",
  //   icon: <Icon name="lithology" />,
  //   multipleAllowed: true,
  //   schema: null,
  //   view: (data) => {
  //     return <div>{`Not Implemented!`}</div>;
  //   },
  //   editor: (data, onUpdate, idx) => {
  //     return <div>{`Not Implemented!`}</div>;
  //   },
  // },
  WaterLevel: WaterLevel,
  Moisture: Moisture,
  SoilVapour: SoilVapour,
  SoilEC: SoilEC,
  /*{
    type: "moisture",
    icon: <Icon name="moisture" />,
    multipleAllowed: false,
    schema: null,
    view: (data) => {
      return <div>{`Not Implemented!`}</div>;
    },
    editor: (data, onUpdate, idx) => {
      return <div>{`Not Implemented!`}</div>;
    },
  },*/
  Sieve: {
    type: "sieve",
    icon: <Icon name="sieve" />,
    multipleAllowed: false,
    schema: null,
    view: (data) => {
      return <div>{`Not Implemented!`}</div>;
    },
    editor: (data, onUpdate, idx) => {
      return <div>{`Not Implemented!`}</div>;
    },
  },
  Chemical: {
    type: "chemical",
    icon: <Icon name="chemical" />,
    multipleAllowed: false,
    schema: null,
    view: (data) => {
      return <div>{`Not Implemented!`}</div>;
    },
    editor: (data, onUpdate, idx) => {
      return <div>{`Not Implemented!`}</div>;
    },
  },
};
