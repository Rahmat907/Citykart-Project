import React from 'react'
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select,  SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { SelectContent } from '@radix-ui/react-select';
import { Button } from '../ui/button';

//  const type = {
//     INPUT: "input",
//     SELECT: "select",
//     TEXTAREA: "textarea",
//  }
const CommonForm = ({formControls, formData,setFormatData,onSubmit,buttonText}) => {
    const renderInputByComponentType =(getcontrolItems)=>{
        let element = null;
        const value = formData[getcontrolItems.name] || ''


        switch (getcontrolItems.componentType) {
            case "input":
                element = (<Input
                name = {getcontrolItems.name} 
                placeholder ={getcontrolItems.placeholder}
                id = {getcontrolItems.name}
                type = {getcontrolItems.type}
                value ={value}
                onChange ={event => setFormatData({
                    ...formData,
                    [getcontrolItems.name]: event.target.value,
                })}
                />
                );
                break;
            case "select":
                element =(
                    <Select onValueChange={(value)=> setFormatData({
                        ...formData,
                         [getcontrolItems.name]: value
                    })} value= {value}>
                   <SelectTrigger className="w-full">
                     <SelectValue placeholder={getcontrolItems.placeholder}></SelectValue>
                   </SelectTrigger>
                   <SelectContent>
                    {
                        getcontrolItems.options && getcontrolItems.options.length > 0 ? 
                        getcontrolItems.options.map( optionItem => <SelectItem key={optionItem.id} value={optionItem.id} >{optionItem.label}</SelectItem>) : null
                    }
                   </SelectContent>
                </Select>
                );
                break;
            case "textarea":
                element = (
                    <Textarea
                        name ={getcontrolItems.name}
                        placeholder = {getcontrolItems.placeholder}
                        id ={getcontrolItems.id}
                        value = {value}
                onChange ={event => setFormatData({
                    ...formData,
                    [getcontrolItems.name]: event.target.value,
                })}
                    />

                );
                break;
        
            default:
                element = <Input
                name = {getcontrolItems.name} 
                placeholder ={getcontrolItems.placeholder}
                id = {getcontrolItems.name}
                type = {getcontrolItems.type}
                value ={value}
                onChange ={event => setFormatData({
                    ...formData,
                    [getcontrolItems.name]: event.target.value,
                })}
                />
                break;
        }
        return element
    }
  return (
    <form onSubmit={onSubmit}>
      <div className='flex flex-col gap-3'>
        {
            formControls.map(controlItems=> <div className='grid w-full gap-1.5'   key={controlItems.name}>  
            <Label className='mb-1'>{controlItems.label}</Label>
            {
                renderInputByComponentType(controlItems)
            }
            </div>
            )
        }
      </div>
      {/* <button type='submit' className='mt-2 w-full '>{buttonText || 'Submit'}</button> */}
      <Button type='submit' className='mt-2 w-full'>{buttonText || 'Submit'}</Button>
    </form>
)
}

export default CommonForm
