import { Card } from "@mantine/core";
import React from "react";
import classes from "./Timetable.module.css";

interface TimetableCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function TimetableCard({ children }: TimetableCardProps) {
  return (
    <Card className={classes.item} m={0} p={1} radius={0} withBorder>
      {children}
    </Card>
  );
}
