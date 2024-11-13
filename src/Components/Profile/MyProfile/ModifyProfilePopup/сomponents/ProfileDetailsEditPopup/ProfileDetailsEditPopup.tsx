import React, {ChangeEvent, useEffect, useState} from 'react';
import {Button, Dialog, Paper, TextField} from "@mui/material";


type PropsType = {
    inputText: string | null
    onSaveTempHandler: (value: string | null) => void
    type: 'contact' | 'desc' | null
    isOpen: boolean
    onClose: () => void
   }

const TextFieldCustom = (props: PropsType) => {
    const [value, setValue] = useState<string | null>(props.inputText)
    const [isValid, setIsValid] = useState(false)

    useEffect(() => setValue(props.inputText), [props.inputText])

    const onSaveHandler = () => {
        if (!isValid){
            if (value !== null && value.trim() === ''){
                props.onSaveTempHandler(null)
                setValue(null)
                setIsValid(false)
            }else {
                props.onSaveTempHandler(value)
                setValue(null)
                setIsValid(false)
            }
        }
    }



    const errorChecker = (type: "desc" | 'contact', value: string) => {
        if (type === 'desc') {
            return setIsValid(value.trim() === '')
        }

        if (type === 'contact') {
            if (value.includes('https://')) {
                if (value.split('/')[3] !== undefined) {
                    return setIsValid(value.split('/')[3].trim().length <= 3)
                } else {
                    return setIsValid(false)
                }
            } else {
                return setIsValid(false)
            }
        }
        return setIsValid(false)
    }



    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const valueTemp = e.currentTarget.value
        setValue(valueTemp)
        props.type && errorChecker(props.type, valueTemp)
    }

    return (
        <>
            <Dialog transitionDuration={500}
                    open={props.isOpen}
                    maxWidth={false}
                    onClose={() => {
                        props.onClose()
                        setIsValid(false)}}
                    style={{margin: '0 auto'}}>
                <Paper sx={{
                    width: '40vh',
                    height: '30vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '5px'
                }}>
                    <div style={{
                        width: '90%',
                        height: '90%',
                        marginLeft: '4%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start'
                    }}>
                        <h3>{'Edit your profile details'}</h3>

                        <TextField
                            autoFocus={true} onChange={onChangeHandler}
                            onKeyDown={event => event.key === 'Enter' && onSaveHandler()}
                            error={isValid}
                            unselectable={'on'}
                            fullWidth
                            helperText={isValid && (props.type === 'desc' ? '* This field is required' : 'Your link is not valid')}
                            inputProps={{style: {fontSize: '16px'}}}
                            id="outlined-basic" label={'Here'}
                            sx={{width: '96%', minHeight: '71px'}}
                            defaultValue={props.inputText &&  props.inputText.includes('https://') ?
                                (props.inputText.split('/')[3] !== undefined ? props.inputText.split('/')[3] : props.inputText) : props.inputText}
                            variant={'standard'}/>
                        <div style={{
                            display: 'flex',
                            width: '100%',
                            height: '100%',
                            justifyContent: 'end',
                            alignItems: 'end'
                        }}>
                            <Button
                                sx={{margin: '0px 5px 10px 0px'}}
                                onClick={() => {
                                    props.onClose()
                                    setIsValid(false)}}
                            >
                                Cansel
                            </Button>
                            <Button
                                disabled={isValid}
                                sx={{margin: '0px 15px 10px 5px'}}
                                onClick={onSaveHandler}>
                                Save
                            </Button>
                        </div>
                    </div>
                </Paper>
            </Dialog>
        </>
    );
};

export default TextFieldCustom;