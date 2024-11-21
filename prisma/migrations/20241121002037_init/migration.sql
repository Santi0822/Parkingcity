-- CreateTable
CREATE TABLE `Pago` (
    `id_pago` INTEGER NOT NULL AUTO_INCREMENT,
    `id_parqueo` INTEGER NULL,
    `monto` DECIMAL(10, 2) NOT NULL,
    `fecha_pago` DATETIME(3) NOT NULL,

    INDEX `id_parqueo`(`id_parqueo`),
    PRIMARY KEY (`id_pago`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Parqueo` (
    `id_parqueo` INTEGER NOT NULL AUTO_INCREMENT,
    `placa` VARCHAR(10) NOT NULL,
    `hora_entrada` DATETIME(3) NOT NULL,
    `hora_salida` DATETIME(3) NULL,
    `costo_total` DECIMAL(10, 2) NULL,

    UNIQUE INDEX `Parqueo_placa_key`(`placa`),
    PRIMARY KEY (`id_parqueo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reporte` (
    `id_reporte` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NULL,
    `tipo_reporte` ENUM('parqueo', 'pago') NOT NULL,
    `descripcion` TEXT NULL,
    `fecha_reporte` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `id_usuario`(`id_usuario`),
    PRIMARY KEY (`id_reporte`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tarifa` (
    `id_tarifa` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo_vehiculo` ENUM('carro', 'moto', 'camion') NOT NULL,
    `tarifa_por_minuto` DECIMAL(10, 2) NOT NULL,
    `fecha_actualizacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_tarifa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('admin', 'user') NOT NULL,

    UNIQUE INDEX `Usuario_username_key`(`username`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pago` ADD CONSTRAINT `Pago_id_parqueo_fkey` FOREIGN KEY (`id_parqueo`) REFERENCES `Parqueo`(`id_parqueo`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reporte` ADD CONSTRAINT `Reporte_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE;
