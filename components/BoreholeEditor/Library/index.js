import LibraryHeader from "./LibraryHeader";
import LibraryContainer from "./LibraryContainer";
import LibraryBlock, { BlockRow } from "./Block";
import { BlockTypes } from "./Block/BlockTypes";
import React, { useState } from 'react';


const BlockViewer = ({ block, title, h, w, format = "square" }) => {
  if (format === "square") {
    return (
      <LibraryBlock
        title={title}
        h={h}
        w={w}
        type={block.type}
        logo={block.icon}
      />
    );
  } else {
    return <BlockRow title={title} type={block.type} logo={block.icon} />;
  }
};

const _items = {
  Overview: {
    items: [
      { title: "Location", block: BlockTypes.Location, format: "row" },
      { title: "Weather", block: BlockTypes.Weather, format: "row" },
      { title: "Notes", block: BlockTypes.Note, format: "row" },
      { title: "Drilling", block: BlockTypes.Drilling, format: "row" },
      { title: "Lithology", block: BlockTypes.Lithology, format: "row" },
      { title: "Drillers", block: BlockTypes.Drillers, format: "row" },
      { title: "Well Log", block: BlockTypes.WellLog, format: "row" },
    ],
  },
  Samples: {
    items: [
      {
        title: "Range Sample",
        h: 30,
        block: BlockTypes.Sample,
        format: "row",
      },
      {
        title: "Point Reading",
        h: 30,
        block: BlockTypes.SamplePoint,
        format: "row",
      },
    ],
  },
  "Tests & Measurements": {
    format: "row",
    items: [
      { title: "Density Test", block: BlockTypes.Density, format: "row" },
      { title: "Water pH", block: BlockTypes.WaterpH, format: "row" },
      {
        title: "Contamination",
        block: BlockTypes.Contamination,
        format: "row",
      },
      {
        title: "Specific Gravity",
        block: BlockTypes.SpecificGravity,
        format: "row",
      },
      { title: "Moisture Content", block: BlockTypes.Moisture, format: "row" },
      {
        title: "Resistivity",
        block: BlockTypes.SoilResistivityField,
        format: "row",
      },
      {
        title: "California Bearing Ratio",
        block: BlockTypes.CaliforniaBearingRatio,
        format: "row",
      },
      {
        title: "Atterberg Test",
        block: BlockTypes.AtterbergTest,
        format: "row",
      },
      { title: "Soil pH", block: BlockTypes.SoilpH, format: "row" },
      { title: "RQD", block: BlockTypes.RQD, format: "row" },
      {
        title: "Slake Durability",
        block: BlockTypes.SlakeDurability,
        format: "row",
      },
      {
        title: "Point Load Test",
        block: BlockTypes.PointLoadTest,
        format: "row",
      },
      { title: "Triaxial", block: BlockTypes.Triaxial, format: "row" },
      { title: "Defect (Rock)", block: BlockTypes.Defect, format: "row" },
      { title: "Water level", block: BlockTypes.WaterLevel, format: "row" },
      { title: "Soil Vapour", block: BlockTypes.SoilVapour, format: "row" },
      {
        title: "Falling Head Test",
        block: BlockTypes.FallingHeadTest,
        format: "row",
      },
      {
        title: "Rising Head Test",
        block: BlockTypes.RisingHeadTest,
        format: "row",
      },
      { title: "Pumping Test", block: BlockTypes.PumpingTest, format: "row" },
      { title: "Packer Test", block: BlockTypes.PackerTest, format: "row" },
      {
        title: "Water Temperature",
        block: BlockTypes.WaterTemprature,
        format: "row",
      },
      {
        title: "Grain Size Distribution",
        block: BlockTypes.GrainSizeDistribution,
        format: "row",
      },
      {
        title: "SPT",
        block: BlockTypes.SPT,
        format: "row",
      },
      {
        title: "Consolidation",
        block: BlockTypes.Consolidation,
        format: "row",
      },
      {
        title: "Bulk Unit Weight",
        block: BlockTypes.UnitWeight,
        format: "row",
      },
      {
        title: "UCS",
        block: BlockTypes.UCS,
        format: "row",
      },
      {
        title: "Pocket Penetrometer",
        block: BlockTypes.PocketPenetrometer,
        format: "row",
      },
      {
        title: "Field Vane",
        block: BlockTypes.FieldVane,
        format: "row",
      },
      {
        title: "Soil Electrical Conductivity",
        block: BlockTypes.SoilEC,
        format: "row",
      },
    ],
  },
};

const filterByItems = (searchText, items) => {
  if (searchText === undefined || searchText === "" || searchText === null) {
    return items;
  }

  let filteredItemDocs = {};

  Object.keys(items).forEach((itemKey, i) => {
    const filteresItems = _items[itemKey].items.filter((jitem) => jitem.title.toLowerCase().includes(searchText.toLowerCase()))

    if (filteresItems.length > 0){
      Object.assign(filteredItemDocs, {[itemKey]: {items: filteresItems}});
    }

  })

  return filteredItemDocs;
}


const Library = (props) => {
  const [searchText, setSearchText] = useState(``);
  const filteredItems = filterByItems(searchText, _items);

  return (
    <div className="library-container flex flex-col flex-grow">
      <div className="library-container-header sticky top-0 flex-grow">
        <LibraryHeader searchChange={setSearchText}></LibraryHeader>
      </div>
      <div className="library-container-content">
        {Object.keys(filteredItems).map((item, i) => {
          return (
            <LibraryContainer key={i} title={item} format={filteredItems[item].format}>
              {filteredItems[item].items
                .sort((a, b) => {
                  if (a.title < b.title) return -1;
                  return a.title > b.title ? 1 : 0;
                })
                .map((jtem, j) => {
                  return (
                    <BlockViewer
                      key={`${i}-${j}`}
                      title={jtem.title}
                      block={jtem.block}
                      h={jtem.h}
                      format={jtem.format}
                    />
                  );
                })}
            </LibraryContainer>
          );
        })}
      </div>

      {/* <BlockViewer title="Drilling" block={BlockTypes.Drilling} /> */}
      {/* <BlockViewer title="Crew" block={BlockTypes.Crew} /> */}
      {/* <BlockViewer title="Media" block={BlockTypes.Media} /> */}
      {/* <BlockViewer title="Sieve" block={BlockTypes.Sieve} /> */}
    </div>
  );
};

export default Library;
