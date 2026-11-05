import React from 'react';

import { InputText } from './InputText';
import { InputNumber } from './InputNumber';
import { InputTextArea } from './InputTextArea';
import { InputCKEditor } from './InputCKEditor';
import { InputFileImage } from './InputFileImage';
import { InputCheckbox } from './InputCheckbox';
import { InputSelect } from './InputSelect';

export const FormGroup = ({ input, idioma, imagem, value, toolbar, onChange, handleImageCrop }) => {
    switch (input.tipo) {
        case 'texto':
            return (
                <InputText
                    title={input.titulo}
                    name={input.name}
                    max={input.max}
                    value={value}
                    idioma={idioma.codigo}
                    onChange={onChange}
                />
            );
        case 'texto_longo':
            return (
                input.editor ?
                <InputCKEditor
                    title={input.titulo}
                    name={input.name}
                    value={value}
                    idioma={idioma.codigo}
                    toolbar={input.toolbar}
                    onChange={onChange}
                />
                :
                <InputTextArea
                    title={input.titulo}
                    name={input.name}
                    value={value}
                    idioma={idioma.codigo}
                    onChange={onChange}
                />
            );
        case 'numero':
            return (
                <InputNumber
                    title={input.titulo}
                    name={input.name}
                    value={value}
                    min={input.min}
                    max={input.max}
                    idioma={idioma.codigo}
                    onChange={onChange}
                />
            );
        case 'imagem':
            return (
                <InputFileImage 
                    title={input.titulo}
                    name={input.name}
                    imagem={input.imagem ? `${input.caminho}${input.imagem}` : '/admin/img/others/select.png'} 
                    size={{ largura: input.largura, altura: input.altura }} 
                    allowCrop={input.crop ? true : false} 
                    onImageCrop={handleImageCrop}
                />
            );
        case 'selecao':
            return (
                <InputSelect
                    title={input.titulo}
                    name={input.name}
                    value={value}
                    idioma={idioma.codigo}
                    options={input.opcoes}
                    onChange={onChange}
                />
            );
        case 'check':
            return (
                <InputCheckbox
                    title={input.titulo}
                    name={input.name}
                    checked={value}
                    onChange={onChange}
                />
            );
        default:
            return null;
    }
};
