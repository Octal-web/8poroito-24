import React, { useRef } from 'react';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    ClassicEditor,
    AccessibilityHelp,
    Alignment,
    AutoLink,
    Autosave,
    BlockQuote,
    Bold,
    CodeBlock,
    Essentials,
    Heading,
    HorizontalLine,
    Indent,
    IndentBlock,
    Italic,
    Link,
    Paragraph,
    SelectAll,
    SourceEditing,
    Undo
} from 'ckeditor5';
import translations from 'ckeditor5/translations/pt-br.js';
import 'ckeditor5/ckeditor5.css';

export const InputCKEditor = ({ toolbar, title, name, value, idioma, onChange }) => {
    const editorContainerRef = useRef(null);
    const editorRef = useRef(null);

    const defaultToolbar = ['sourceEditing', '|', ...toolbar];

    const editorConfig = {
        toolbar: defaultToolbar,
        plugins: [
            AccessibilityHelp,
            Alignment,
            AutoLink,
            Autosave,
            BlockQuote,
            Bold,
            CodeBlock,
            Essentials,
            Heading,
            HorizontalLine,
            Indent,
            IndentBlock,
            Italic,
            Link,
            Paragraph,
            SelectAll,
            SourceEditing,
            Undo
        ],
        language: 'pt-br',
        translations: [translations],
        initialData: value
    };

    return (
        <div className="mb-6">
            <div className="flex items-center mb-2">
                <img src={`/admin/img/flags/${idioma}.png`} className="w-5 mr-1" />
                <label className="block font-bold text-gray-500">{title}</label>
            </div>
            <div className="text-sm">
                <div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
                    <div className="editor-container__editor">
                        <div ref={editorRef}> 
                            <CKEditor
                                editor={ClassicEditor}
                                config={editorConfig}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    onChange(name, data);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};