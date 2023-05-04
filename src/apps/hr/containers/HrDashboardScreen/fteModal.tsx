import { Button, InputNumber, Modal, Select } from "antd";
import React, { useState } from "react";
import '../../../../sass/main.scss';
import deleteIcon from "../../../common/assets/images/delete.svg";

interface Props {
    closePopUp?: () => any,
    handleSubmit: (value: any, sites: number[]) => any,
    sites: object[];
}

const { Option } = Select;


export default function FteModal(props: Props) {
    const { sites } = props;
    const [fteValue, setFteValue] = useState(0);
    const [selectedSitesIds, setSelectedSitesIds] = useState<any[]>([]);

    function onChange(value: number | string | undefined) {
        setFteValue(Number(value));
    }

    let namdIdmapper: any = {};
    sites?.forEach((obj: any) => {
        namdIdmapper[obj.name] = obj.id;
    });

    function handleSiteChange(selectedSites: any[]) {
        if (selectedSites?.includes("All Sites")) {
            setSelectedSitesIds(["*"]);

        } else {
            const selectedSiteIds = selectedSites.map((site) => namdIdmapper[site]);
            setSelectedSitesIds(selectedSiteIds);
        }
    }

    return (
        <Modal
            visible
            width={400}
            onCancel={props.closePopUp}
            title={<div className='modal-header'>Set % FTE Guidelines</div>}
            footer={null}
            closeIcon={<img src={deleteIcon} className="cancel-button" alt="close" />}
        >
            <div className="flex flex-column center">
                <div className="modal-content">
                    <InputNumber
                        className='w-100'
                        onChange={onChange}
                        placeholder="% FTE"
                        min={0}
                        max={100}
                    />
                </div>
                <Select
                    className="fte-sites-dropdown"
                    mode="multiple"
                    placeholder="Please select sites"
                    onChange={handleSiteChange}
                    allowClear
                    autoClearSearchValue
                    showSearch
                >
                    <Option className="capitalize" key={"all"} value={"All Sites"} >
                        {"All Sites"}
                    </Option>

                    {sites?.map((option: any) => {
                        return (
                            <Option className="capitalize" key={option.id} value={option?.name}>
                                {option?.name}
                            </Option>
                        );
                    })
                    }
                </Select>

                <Button type="primary" disabled={!fteValue || selectedSitesIds.length < 1} className="bold" onClick={() => props.handleSubmit(fteValue, selectedSitesIds)}>Publish To Site Managers</Button>
            </div>
        </Modal>
    );
}


