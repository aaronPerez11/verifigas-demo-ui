import { ErrorSistemaModel } from "./ErrorSistemaModel";

export interface CatalogoErrorModel {
  id: number;
  idGasolinera: number;
  correcto: boolean;
  estatus: boolean;
  errorSistemaModel: ErrorSistemaModel;
}
