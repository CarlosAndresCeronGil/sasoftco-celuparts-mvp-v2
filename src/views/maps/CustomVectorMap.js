// react plugin for creating vector maps
import React from 'react';
import { VectorMap } from 'react-jvectormap';
import './VectorMap.css';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

import ComponentCard from '../../components/ComponentCard';

const mapData = {
  FR: 540,
  AU: 360,
  GB: 690,
  GE: 200,
  IN: 400,
  RO: 600,
  RU: 300,
  US: 2920,
};
const CustomVectorMap = () => {
  return (
    <>
      <BreadCrumbs />
      <ComponentCard title="World Map">
        <VectorMap
          map="world_mill"
          backgroundColor="transparent"
          zoomOnScroll={false}
          containerStyle={{
            width: '100%',
            height: '375px',
          }}
          containerClassName="map"
          regionStyle={{
            initial: {
              fill: '#d5e4e4',
              'fill-opacity': 0.9,
              stroke: '1',
              'stroke-width': 1,
              'stroke-opacity': 0.5,
            },
          }}
          series={{
            regions: [
              {
                values: mapData,
                scale: ['#1e88e5'],
              },
            ],
          }}
        />
      </ComponentCard>
      <ComponentCard title="USA Map">
        <VectorMap
          map="us_aea"
          backgroundColor="transparent"
          //ref="map"
          //ref={(e) => { this.map = e; }}
          containerStyle={{
            width: '100%',
            height: '225px',
          }}
          regionStyle={{
            initial: {
              fill: '#b8e9f1',
              'fill-opacity': 0.9,
              stroke: '1',
              'stroke-width': 1,
              'stroke-opacity': 0.5,
            },
          }}
          containerClassName="map"
        />
      </ComponentCard>
    </>
  );
};

export default CustomVectorMap;
