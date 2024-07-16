import { NextRequest, NextResponse } from "next/server";
import {getGoogleSheetsData, sendEmail, updateSheet} from './../../../../utils/gsheets'

export async function GET(req: NextRequest) {
  const url = await req.nextUrl.toString();
  const clientName = url.split("/")[5]

  const instanceReport = "1BPpgRi0HPeVaMs_cPnmY5O-OrmwHMeRlWkoSln043G4"
  const clientIds = await getGoogleSheetsData(instanceReport, "A:A")
  const rowIdx = clientIds?.indexOf([clientName])
  if (rowIdx) {
    updateSheet(instanceReport, "C" + rowIdx.toString(), "TRUE")
  } else {
    console.log(rowIdx + " was not found in table")
  }

  return NextResponse.json({status: 200, vals: clientIds}) 
}