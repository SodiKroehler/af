import { NextRequest, NextResponse } from "next/server";
import {email} from './../../../utils/mailer3'
import {getGoogleSheetsData, updateSheet, sendEmail} from './../../../utils/gsheets'
// import { send } from "process";


export async function GET() {
    const testerURL= "1BPpgRi0HPeVaMs_cPnmY5O-OrmwHMeRlWkoSln043G4"
    // const mailingInfo = process.env.G_SHEETS_ID
    // const clientIds = await getGoogleSheetsData(mailingInfo, "G:G")
    // const numClients = clientIds?.length ?? 0
    let updateStatus = ""


    console.log("changing sheet")
    let result = await updateSheet(testerURL, "Sheet1!B9", 'hellowhirl')
    

      return NextResponse.json({result});

    // try{
    //   for( var i=0; i< numClients; i++){
    //     // const status = sendEmail(clientIds?[i]:"sodikroehler@gmail.com", "subject" + i.toString(), "nobodynocrime")
    //     const sta = await email({
    //       sender: clientIds?[i]:"sodikroehler@gmail.com",
    //       subject: "hello to " + i.toString()
    //     }).then((r) =>{
    //       console.log(r)
    //       if (r.accepted.length>0) {
    //         let result = updateSheet(instanceReport, "B" + i.toString(), "TRUE")
    //         updateStatus = "accepted" + result;
    //       } else {
    //         let result = updateSheet(instanceReport, "B" + i.toString(), r)
    //         updateStatus = "accepted" + result;
    //       }
    //     })
    //   }
    // } catch (e) {
    //   console.log(e)
    //   return NextResponse.json({status: 500, error: e});

    // }
    
    // const sta = await email().then((r) => {
    //   if (r.accepted.length > 0) {
    //     res = NextResponse.json({status: 200}) 
    //   } else {
    //     res = NextResponse.json({status: 403}) 
    //   }})
    // }



    // return NextResponse.json({status: 200, updateStatus: updateStatus});
  }
  