"use client"
import { Amplify } from "aws-amplify";
import Dashboard from "../../../components/dashboard/dashboard"

import outputs from "@/amplify_outputs.json";
Amplify.configure(outputs);

export function Home() {
  return (
    <>
      <Dashboard />
    </>
  )
}

export default Home