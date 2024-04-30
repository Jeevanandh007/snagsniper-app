import { Geolocation } from "@capacitor/geolocation";
import { deserializeArray } from "class-transformer";
import constate from "constate";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { UserPhoto } from "./hooks/use-camera.hook";
import { useUsePersistedStateHook } from "./hooks/use-persisted-state.hook";
export enum SnagStatus {
  OPEN = "OPEN",
  WORK_IN_PROGRESS = "WORK_IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  CLOSED = "CLOSED",
}

export interface ActivityLog {
  description: string;
  status: SnagStatus;
  createdAt: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export class SnagDTO {
  id: string;
  description: string;
  snagPhotos: UserPhoto[];
  snagLocation: Location;
  status: SnagStatus = SnagStatus.OPEN;
  fixPhotos?: UserPhoto[];
  fixDescription?: string;
  fixLocation?: Location;

  activityLog: ActivityLog[] = [];
  createdAt: string;

  constructor(
    id: string,
    description: string,
    snagPhotos: UserPhoto[],
    createdAt: string,
    snagLocation: Location
  ) {
    this.id = id;
    this.description = description;
    this.snagPhotos = snagPhotos;
    this.createdAt = createdAt;
    this.snagLocation = snagLocation;
  }

  static async createInstance(description: string, snagPhotos: UserPhoto[]) {
    const coordinates = await Geolocation.getCurrentPosition();

    const newSnag = new SnagDTO(
      uuidv4(),
      description,
      snagPhotos,
      moment().toISOString(),
      {
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude,
      }
    );

    newSnag.activityLog.push({
      createdAt: moment().toISOString(),
      description,
      status: SnagStatus.OPEN,
    });

    return newSnag;
  }

  async setFix(description: string, snagPhotos: UserPhoto[]) {
    const coordinates = await Geolocation.getCurrentPosition();

    this.fixDescription = description;
    this.fixPhotos = snagPhotos;

    this.fixLocation = {
      latitude: coordinates.coords.latitude,
      longitude: coordinates.coords.longitude,
    };
  }
}

function useAppContext() {
  const {
    loading,
    setState: setSnagList,
    state: snagList,
    initState,
  } = useUsePersistedStateHook<SnagDTO[]>([], "snag-list", {
    serializer: (value) => JSON.stringify(value),
    deserializer: (value) => {
      return deserializeArray(SnagDTO, value);
    },
    // deserializer: (value: string) => JSON.parse(value),
  });

  const createSnag = (newSnag: SnagDTO) => {
    return setSnagList(snagList.concat(newSnag));
  };

  const deleteSnag = (id: string) => {
    return setSnagList(snagList.filter((snag) => snag.id !== id));
  };

  const updateSnag = (newSnag: SnagDTO) => {
    const excludedList = snagList.filter((snag) => snag.id !== newSnag.id);

    return setSnagList(excludedList.concat(newSnag));
  };

  return { snagList, createSnag, deleteSnag, updateSnag, loading, initState };
}

export const [AppContextProvider, useAppContextHook] = constate(useAppContext);
