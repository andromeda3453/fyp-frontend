import React, { useEffect, useState } from "react";
import { FormControl, Input, ScrollView, Text, VStack } from "native-base";
import TextBox from "../components/TextBox";
import InputSpinner from "react-native-input-spinner";
import { Select } from "@mobile-reality/react-native-select-pro";


export default function EditResults({ route }) {

    const disabled_color = "#E5F3F2"


    console.log(route.params);

    return (

        <ScrollView w={"full"} h={"full"} >

            <VStack flex={1} space="sm" px={"10"} py={"10"}>
                {/* Name */}
                {/* <TextBox
                    label="Name"
                    value={route.params.name ? JSON.stringify(route.params.name) : undefined}
                /> */}
                <FormControl.Label>
                    Name
                </FormControl.Label>
                <Input
                    value={route.params.name ? JSON.stringify(route.params.name) : undefined}
                />

                {/* Gender */}
                <Select
                    options={[{ value: 1, label: "Male" }, { value: 2, label: "Female" }]}
                    clearable={false}
                    closeOptionsListOnSelect={true}
                    placeholderText="Gender"
                    //defaultOption={route.params.gender ? (route.params.gender == "male" ? { value: 1, label: "Male" } : { value: 2, label: "Female" }) : undefined}
                    // defaultOption={{ value: 2, label: "Female" }}
                    theme="light"
                    styles={{ select: { container: { borderColor: "teal", height: 50 }, text: { fontWeight: "600" } } }}

                />

                {/* Age */}
                <FormControl.Label>
                    Age
                </FormControl.Label>
                <InputSpinner
                    min={1}
                    max={100}
                    step={1}
                    color={"teal"}
                    skin="paper"
                    buttonTextColor="#000000"
                    value={route.params.age ? parseInt(route.params.age.split(' ')[0]) : 0}
                />
                {/* UserID */}
                {/* <TextBox
                    label="UserId"
                    props={{ editable: false, style: { backgroundColor: disabled_color } }}
                    value={route.params.userId != null ? route.params.userId : undefined}
                /> */}
                <FormControl.Label>
                    User ID
                </FormControl.Label>
                <Input
                    value={route.params.userId != null ? route.params.userId : undefined}
                    editable={false}
                />


                {/* Location */}
                {/* <TextBox
                    label="Location"
                    value={route.params.location ? route.params.location : undefined}
                /> */}
                <FormControl.Label>
                    Location
                </FormControl.Label>
                <Input
                    value={route.params.location ? route.params.location : undefined}
                />


                {/* Medical record no */}
                {/* <TextBox
                    label="Medical Record No"
                    value={route.params.medicalRecordNo ? route.params.medicalRecordNo : undefined}
                /> */}
                <FormControl.Label>
                    Medical Record No
                </FormControl.Label>
                <Input
                    value={route.params.medicalRecordNo ? route.params.medicalRecordNo : undefined}
                />


                {/* Specimen no */}
                {/* <TextBox
                    label="Specimen No"
                    value={route.params.specimenNo ? route.params.specimenNo : undefined}
                /> */}
                <FormControl.Label>
                    Specimen No
                </FormControl.Label>
                <Input
                    value={route.params.specimenNo ? route.params.specimenNo : undefined}
                />


                {/* Account no */}
                {/* <TextBox
                    label="Account No"
                    value={route.params.accountNo ? route.params.accountNo : undefined}
                /> */}
                <FormControl.Label>
                    Account No
                </FormControl.Label>
                <Input
                    value={route.params.accountNo ? route.params.accountNo : undefined}
                />


                {/* Referred By */}
                {/* <TextBox
                    label="Referred By"
                    value={route.params.referredBy != null ? route.params.referredBy : undefined}
                /> */}
                <FormControl.Label>
                    Referred By
                </FormControl.Label>
                <Input
                    value={route.params.referredBy != null ? route.params.referredBy : undefined}
                />


                {/* Receipt */}
                {/* <TextBox
                    label="Receipt"
                    value={route.params.receipt ? route.params.receipt : undefined}
                /> */}
                <FormControl.Label>
                    Receipt
                </FormControl.Label>
                <Input
                    value={route.params.receipt ? route.params.receipt : undefined}
                />



                {/* Medical Report No */}
                {/* <TextBox
                    label="Medical Report No"
                    value={route.params.medicalReportNo ? route.params.medicalReportNo : undefined}
                /> */}
                <FormControl.Label>
                    Medical Report No
                </FormControl.Label>
                <Input
                    value={route.params.medicalReportNo ? route.params.medicalReportNo : undefined}
                />


                {/* Ward No */}
                {/* <TextBox
                    label="Ward No"
                    value={route.params.ward ? route.params.ward : undefined}
                /> */}
                <FormControl.Label>
                    Ward No
                </FormControl.Label>
                <Input
                    value={route.params.ward ? route.params.ward : undefined}
                />


                {/* Bed no */}
                {/* <TextBox
                    label="Bed No"
                    value={route.params.bedNo ? route.params.bedNo : undefined}
                /> */}
                <FormControl.Label>
                    Bed No
                </FormControl.Label>
                <Input
                    value={route.params.bedNo ? route.params.bedNo : undefined}
                />
            </VStack>
        </ScrollView>


    )
}