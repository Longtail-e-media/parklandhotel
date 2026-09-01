import { getRooms } from "@/lib/data";
import { rooms as fallbackRooms } from "@/data/data";
import RoomsSectionClient from "./RoomsSectionClient";

export default async function RoomsSection() {
  const rooms = await getRooms();

  return <RoomsSectionClient rooms={rooms.length > 0 ? rooms : fallbackRooms} />;
}
