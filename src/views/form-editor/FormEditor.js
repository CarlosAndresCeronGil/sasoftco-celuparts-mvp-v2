import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useState } from 'react';
import { convertFromRaw } from 'draft-js';
import { Input } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import DashCard from '../../components/dashboard/dashboardCards/DashCard';
import './editor.scss';

const content = {
  entityMap: {},
  blocks: [
    {
      key: '637gr',
      text: 'Initialized from content state.',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
};

const FormEditor = () => {
  const [contentState, setEditorState] = useState(convertFromRaw(content));
  const onContentStateChange = (c) => {
    setEditorState(c);
  };
  return (
    <>
      <BreadCrumbs />
      <DashCard title="Wysiwyg Editor" subtitle="you can use this editor component">
        <Editor
          wrapperClassName="demo-wrapper mb-0"
          editorClassName="demo-editor border mb-4 edi-height"
          onContentStateChange={onContentStateChange}
        />
        <Input type="textarea" raw={4} disabled value={JSON.stringify(contentState, null, 4)} />
      </DashCard>
    </>
  );
};

export default FormEditor;
