import {ChartAreaInteractive} from "@/components/chart-area-interactive"
import {DataTable} from "@/components/data-table"
import {SectionCards} from "@/components/section-cards"
import {MainLayout} from 'components/layout/MainLayout'

import data from "./data.json"
import React from "react";

export default function Page() {
    return (
        <MainLayout>
            <SectionCards/>
            <ChartAreaInteractive/>
            <DataTable data={data}/>
        </MainLayout>
    )
}
