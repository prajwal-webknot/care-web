import { Box, TextField, Typography, Button } from '@mui/material';
import React from 'react';
import CancelCircleIcon from '@mui/icons-material/Cancel';

interface Props {
    specialRequirements: any;
    handleaddSpecialRequirementsChange: any;
    handlespecialRequirementsChange: any;
    handleaddSpecialRequirementCrossButton: any;

    technicalRequirements: any;
    handletechnicalRequirementsChange: any;
    handleaddtechnicalRequirementsChange: any;
    handletechRequirementCrossButton: any;
}
function ScreenRequirements(props: Props) {
    const {
        specialRequirements,
        handleaddSpecialRequirementsChange,
        handlespecialRequirementsChange,
        handleaddSpecialRequirementCrossButton,

        technicalRequirements,
        handletechnicalRequirementsChange,
        handleaddtechnicalRequirementsChange,
        handletechRequirementCrossButton,
    } = props;
    return (
        <Box
            sx={{
                width: 1,
                marginY: 2,
                marginX: 1,
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
            }}
        >
            <Box
                sx={{
                    width: 0.5,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'column',
                    margin: 1,
                }}
            >
                <Typography
                    sx={{
                        width: 0.8,
                        margin: 1,
                        textAlign: 'start',
                        color: '#000000',
                        fontSize: '18px',
                        lineHeight: '20px',
                    }}
                >
                    Mention Special Needs
                </Typography>
                <Box
                    sx={{
                        width: 0.8,
                        minHeight: 320,
                        maxHeight: 320,
                        borderRadius: '10px',
                        backgroundColor: '#F6F6F6',
                        overflow: 'auto',
                    }}
                >
                    {specialRequirements.map((value: any, id: any) => {
                        return (
                            <Box
                                key={id}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'relative',
                                }}
                            >
                                <TextField
                                    key={id}
                                    sx={{
                                        width: 0.93,
                                        marginY: 1,
                                        backgroundColor: '#ffffff',
                                    }}
                                    size='small'
                                    label="Enter here"
                                    value={value ? value : ''}
                                    onChange={(e) => handlespecialRequirementsChange(e, id)}
                                />

                                {specialRequirements[id] === '' ? (
                                    <></>
                                ) : (
                                    <CancelCircleIcon
                                        key={id}
                                        sx={{
                                            position: 'absolute',
                                            right: '4%',
                                            top: '19%',
                                            zIndex: 2,
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => handleaddSpecialRequirementCrossButton(id)}
                                        color="error"
                                    />
                                )}
                            </Box>
                        );
                    })}
                </Box>

                <Button
                    sx={{ width: 0.8, margin: 1 }}
                    variant="outlined"
                    color="error"
                    size='small'
                    onClick={handleaddSpecialRequirementsChange}
                >
                    Add More
                </Button>
            </Box>
            <Box
                sx={{
                    width: 0.5,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'column',
                    margin: 1,
                }}
            >
                <Typography
                    sx={{
                        width: 0.8,
                        margin: 1,
                        textAlign: 'start',
                        color: '#000000',
                        fontSize: '18px',
                        lineHeight: '20px',
                    }}
                >
                    Mention IT Resources
                </Typography>
                <Box
                    sx={{
                        width: 0.8,
                        minHeight: 320,
                        maxHeight: 320,
                        borderRadius: '10px',
                        backgroundColor: '#F6F6F6',
                        overflow: 'auto',
                    }}
                >
                    {/* {technicalRequirements.map((value: any, id: any) => {
                        return (
                            <Box key={id} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <TextField
                                    key={id}
                                    sx={{
                                        width: technicalRequirements[id] === '' ? 0.95 : 0.9,
                                        marginY: 1,
                                        backgroundColor: '#ffffff',
                                    }}
                                    label="Add here"
                                    value={value ? value : ''}
                                    onChange={(e) => handletechnicalRequirementsChange(e, id)}
                                />

                                {technicalRequirements[id] === '' ? (
                                    <></>
                                ) : (
                                    <CancelCircleIcon
                                        key={id}
                                        onClick={() => handletechRequirementCrossButton(id)}
                                        color="error"
                                    />
                                )}
                            </Box>
                        );
                    })} */}
                    {technicalRequirements.map((value: any, id: any) => {
                        return (
                            <Box
                                key={id}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'relative',
                                }}
                            >
                                <TextField
                                    key={id}
                                    sx={{
                                        width: 0.93,
                                        marginY: 1,
                                        backgroundColor: '#ffffff',
                                    }}

                                    size='small'
                                    label="Enter here"
                                    value={value ? value : ''}
                                    onChange={(e) => handletechnicalRequirementsChange(e, id)}
                                />

                                {technicalRequirements[id] === '' ? (
                                    <></>
                                ) : (
                                    <CancelCircleIcon
                                        key={id}
                                        sx={{
                                            position: 'absolute',
                                            right: '3%',
                                            top: '15%',
                                            zIndex: 2,
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => handletechRequirementCrossButton(id)}
                                        color="error"
                                    />
                                )}
                            </Box>
                        );
                    })}
                </Box>
                <Button
                    sx={{ width: 0.8, margin: 1 }}
                    variant="outlined"
                    color="error"
                    size='small'
                    onClick={handleaddtechnicalRequirementsChange}
                >
                    Add More
                </Button>
            </Box>
        </Box>
    );
}

export default ScreenRequirements;
