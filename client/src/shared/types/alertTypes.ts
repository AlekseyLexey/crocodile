
export type AlertType = "success" | "error";

export interface AlertContextType {
  showAlert: (message: string, type?: AlertType) => void;
}

export interface AlertState {
  message: string;
  id: string;
  type: AlertType;
}