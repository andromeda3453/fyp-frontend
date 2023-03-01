import React, { useEffect, useState } from "react";
import { ScrollView, VStack } from "native-base";
import TextBox from "../components/TextBox";
import InputSpinner from "react-native-input-spinner";
import { Select } from "@mobile-reality/react-native-select-pro";


export default function EditResults() {

    const disabled_color = "#E5F3F2"

    return (

        <ScrollView w={"full"} h={"full"} >

            <VStack flex={1} space="sm" px={"10"} py={"10"}>
                {/* Name */}
                <TextBox
                    label="Name"
                />

                {/* Gender */}
                <Select
                    options={[{ value: 1, label: "Male" }, { value: 2, label: "Female" }]}
                    clearable={false}
                    closeOptionsListOnSelect={true}
                    placeholderText="Gender"
                    theme="light"
                    styles={{ select: { container: { borderColor: "teal", height: 50 }, text: { fontWeight: "600" } } }}

                />

                {/* Age */}
                <InputSpinner
                    min={1}
                    max={100}
                    step={1}
                    color={"teal"}
                    skin="paper"
                    buttonTextColor="#000000"
                />

                {/* UserID */}
                <TextBox
                    label="UserId"
                    props={{ editable: false, style: { backgroundColor: disabled_color } }}
                />

                {/* Location */}
                <TextBox
                    label="Location"
                />


                {/* Medical record no */}
                <TextBox
                    label="Medical Record No"
                />


                {/* Specimen no */}
                <TextBox
                    label="Specimen No"
                />


                {/* Account no */}
                <TextBox
                    label="Account No"
                />


                {/* Referred By */}
                <TextBox
                    label="Referred By"
                />


                {/* Receipt */}
                <TextBox
                    label="Receipt"
                />


                {/* Medical Report No */}
                <TextBox
                    label="Medical Report No"
                />


                {/* Ward No */}
                <TextBox
                    label="Ward No"
                />


                {/* Bed no */}
                <TextBox
                    label="Bed No"
                />
            </VStack>
        </ScrollView>


    )
}