-- CreateEnum
CREATE TYPE "TipoReporte" AS ENUM ('parqueo', 'pago');

-- CreateEnum
CREATE TYPE "TipoVehiculo" AS ENUM ('carro', 'moto', 'camion');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'user');

-- CreateTable
CREATE TABLE "Pago" (
    "id_pago" SERIAL NOT NULL,
    "id_parqueo" INTEGER,
    "monto" DECIMAL(65,30) NOT NULL,
    "fecha_pago" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pago_pkey" PRIMARY KEY ("id_pago")
);

-- CreateTable
CREATE TABLE "Parqueo" (
    "id_parqueo" SERIAL NOT NULL,
    "placa" VARCHAR(10) NOT NULL,
    "hora_entrada" TIMESTAMP(3) NOT NULL,
    "hora_salida" TIMESTAMP(3),
    "costo_total" DECIMAL(65,30),

    CONSTRAINT "Parqueo_pkey" PRIMARY KEY ("id_parqueo")
);

-- CreateTable
CREATE TABLE "Reporte" (
    "id_reporte" SERIAL NOT NULL,
    "id_usuario" INTEGER,
    "tipo_reporte" "TipoReporte" NOT NULL,
    "descripcion" TEXT,
    "fecha_reporte" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reporte_pkey" PRIMARY KEY ("id_reporte")
);

-- CreateTable
CREATE TABLE "Tarifa" (
    "id_tarifa" SERIAL NOT NULL,
    "tipo_vehiculo" "TipoVehiculo" NOT NULL,
    "tarifa_por_minuto" DECIMAL(65,30) NOT NULL,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tarifa_pkey" PRIMARY KEY ("id_tarifa")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id_usuario" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "UserRole" NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateIndex
CREATE INDEX "id_parqueo" ON "Pago"("id_parqueo");

-- CreateIndex
CREATE UNIQUE INDEX "Parqueo_placa_key" ON "Parqueo"("placa");

-- CreateIndex
CREATE INDEX "id_usuario" ON "Reporte"("id_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_username_key" ON "Usuario"("username");

-- AddForeignKey
ALTER TABLE "Pago" ADD CONSTRAINT "Pago_id_parqueo_fkey" FOREIGN KEY ("id_parqueo") REFERENCES "Parqueo"("id_parqueo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reporte" ADD CONSTRAINT "Reporte_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id_usuario") ON DELETE SET NULL ON UPDATE CASCADE;
