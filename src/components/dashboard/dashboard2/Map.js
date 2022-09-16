import React from 'react';
import { VectorMap } from 'react-jvectormap';
import DashCard from '../dashboardCards/DashCard';
import '../../../views/maps/VectorMap.css';

const Map = () => {
  return (
    <DashCard title="Current Visitors" subtitle="Different Devices Used to Visit">
      <div className="text-center mt-3 mb-3">
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
      </div>
      <div className="hstack gap-2 mt-5 pt-4 justify-content-center pb-1">
        <div className="d-flex align-items-center text-success fs-6">
          <i className="bi bi-circle-fill fs-7 me-2"></i>Valley
        </div>
        <div className="d-flex align-items-center text-primary fs-6">
          <i className="bi bi-circle-fill fs-7 me-2"></i>Newyork
        </div>
        <div className="d-flex align-items-center text-danger fs-6">
          <i className="bi bi-circle-fill fs-7 me-2"></i>Kansas
        </div>
      </div>
    </DashCard>
  );
};

export default Map;
