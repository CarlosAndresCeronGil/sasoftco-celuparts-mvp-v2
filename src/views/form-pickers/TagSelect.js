/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import TagsInput from 'react-tagsinput';
import chroma from 'chroma-js';
import Select, { components } from 'react-select';
import 'react-tagsinput/react-tagsinput.css';
import Switch from 'react-bootstrap-switch';
import { colourOptions, groupedOptions } from './Data';
import 'react-bootstrap-switch/dist/css/bootstrap3/react-bootstrap-switch.min.css';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import './tagselect.scss';

import ComponentCard from '../../components/ComponentCard';

/*------------------------------------*/
/* For Select Plugin - (1)            */
/*------------------------------------*/
const dot = (color = '#ccc') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '""',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

/*------------------------------------*/
/* For Select Plugin - (2)            */
/*------------------------------------*/
const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : null,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, 'white') > 2
          ? 'white'
          : 'black'
        : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot() }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};

/*------------------------------------*/
/* For Select Plugin - (3)            */
/*------------------------------------*/
const CustomClearText = () => 'clear all';
const ClearIndicator = (props) => {
  const {
    // eslint-disable-next-line react/prop-types
    children = <CustomClearText />,
    // eslint-disable-next-line react/prop-types
    getStyles,
    // eslint-disable-next-line react/prop-types
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div {...restInnerProps} ref={ref} style={getStyles('clearIndicator', props)}>
      <div style={{ padding: '0px 5px' }}>{children}</div>
    </div>
  );
};

const ClearIndicatorStyles = (base, state) => ({
  ...base,
  cursor: 'pointer',
  color: state.isFocused ? 'blue' : 'black',
});

/*------------------------------------*/
/* For Select Plugin - (4)            */
/*------------------------------------*/
const groupStyles = {
  border: `2px dotted ${colourOptions[2].color}`,
  borderRadius: '5px',
  background: '#f2fcff',
};

const Group = (props) => (
  <div style={groupStyles}>
    <components.Group {...props} />
  </div>
);

/*------------------------------------*/
/* For Select Plugin - (5)            */
/*------------------------------------*/
const IndicatorsContainer = (props) => {
  return (
    <div style={{ background: colourOptions[2].color }}>
      <components.IndicatorsContainer {...props} />
    </div>
  );
};

/*------------------------------------*/
/* For Select Plugin - (6)            */
/*------------------------------------*/
const menuHeaderStyle = {
  padding: '8px 12px',
  background: colourOptions[2].color,
  color: 'white',
};

const MenuList = (props) => {
  return (
    <components.MenuList {...props}>
      <div style={menuHeaderStyle}>Custom Menu List</div>
      {props.children}
    </components.MenuList>
  );
};

/*------------------------------------*/
/* For Select Plugin - (7)            */
/*------------------------------------*/
const controlStyles = {
  borderRadius: '1px solid black',
  padding: '5px',
  background: colourOptions[1].color,
  color: 'white',
};

const ControlComponent = (props) => (
  <div style={controlStyles}>
    <p>Custom Control</p>
    <components.Control {...props} />
  </div>
);

const TagSelect = () => {
  const [regularTags, setRegularTags] = useState(['MacOs', 'Windows', 'BeOS', 'Linux']);

  const handleRegularTags = (tags) => {
    setRegularTags(tags);
  };

  return (
    <div>
      <BreadCrumbs />
      {/*--------------------------------------------------------------------------------*/}
      {/* Start Inner Div*/}
      {/*--------------------------------------------------------------------------------*/}
      {/*--------------------------------------------------------------------------------*/}
      {/* Start Tags                                                                     */}
      {/*--------------------------------------------------------------------------------*/}
      <Row>
        <Col md="12">
          <ComponentCard title="Tags">
            <TagsInput
              value={regularTags}
              onChange={(tags) => handleRegularTags(tags)}
              tagProps={{
                className: 'react-tagsinput-tag bg-info text-white rounded',
              }}
            />
          </ComponentCard>
        </Col>
      </Row>
      {/*--------------------------------------------------------------------------------*/}
      {/* Start Select and Mutiple Select Options                                        */}
      {/*--------------------------------------------------------------------------------*/}
      <h4 className="mb-3">Select and Mutiple Select Options</h4>
      <Row>
        <Col md="6">
          <ComponentCard title="Color Select">
            <Select
              defaultValue={colourOptions[2]}
              label="Single select"
              options={colourOptions}
              styles={colourStyles}
            />
          </ComponentCard>
        </Col>
        <Col md="6">
          <ComponentCard title="Customized Background Color Multi-Select">
            <Select
              closeMenuOnSelect={false}
              defaultValue={[colourOptions[0], colourOptions[1]]}
              isMulti
              options={colourOptions}
              styles={colourStyles}
            />
          </ComponentCard>
        </Col>
        <Col md="6">
          <ComponentCard title="Custom Clear Indicator">
            <Select
              closeMenuOnSelect={false}
              components={{ ClearIndicator }}
              styles={{ clearIndicator: ClearIndicatorStyles }}
              defaultValue={[colourOptions[4], colourOptions[5]]}
              isMulti
              options={colourOptions}
            />
          </ComponentCard>
        </Col>
        <Col md="6">
          <ComponentCard title="Custom Group">
            <Select
              defaultValue={colourOptions[1]}
              options={groupedOptions}
              components={{ Group }}
            />
          </ComponentCard>
        </Col>
        <Col md="6">
          <ComponentCard title="Custom Indicators Container">
            <Select
              closeMenuOnSelect={false}
              components={{ IndicatorsContainer }}
              defaultValue={[colourOptions[4], colourOptions[5]]}
              isMulti
              options={colourOptions}
            />
          </ComponentCard>
        </Col>
        <Col md="6">
          <ComponentCard title="Menus">
            <Select
              defaultValue={colourOptions[1]}
              options={groupedOptions}
              components={{ MenuList }}
            />
          </ComponentCard>
        </Col>
        <Col md="6">
          <ComponentCard title="Custom Control">
            <Select
              defaultValue={colourOptions[0]}
              isClearable
              components={{ Control: ControlComponent }}
              isSearchable
              name="color"
              options={colourOptions}
            />
          </ComponentCard>
        </Col>
      </Row>
      {/*--------------------------------------------------------------------------------*/}
      {/* Start Switches                                                                 */}
      {/*--------------------------------------------------------------------------------*/}
      <h4 className="mb-3">Switches</h4>
      <Row>
        <Col md="4">
          <ComponentCard title="Default Switch">
            <Switch defaultValue={false} /> <Switch />
          </ComponentCard>
        </Col>
        <Col md="4">
          <ComponentCard title="Simple Switch">
            <Switch onText="Red" offText="Yellow" defaultValue={false} />{' '}
            <Switch onText="Yellow" offText="Red" />
          </ComponentCard>
        </Col>
        <Col md="4">
          <ComponentCard title="Switch with Icons">
            <Switch
              onText={<i className="bi bi-patch-check" />}
              offText={<i className="bi bi-patch-minus" />}
              defaultValue={false}
            />{' '}
            <Switch
              onText={<i className="bi bi-patch-minus" />}
              offText={<i className="bi bi-patch-check" />}
            />
          </ComponentCard>
        </Col>
      </Row>
      {/*--------------------------------------------------------------------------------*/}
      {/*End Inner Div*/}
      {/*--------------------------------------------------------------------------------*/}
    </div>
  );
};

export default TagSelect;
