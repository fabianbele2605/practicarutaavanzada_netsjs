# Reporting Module

## 📋 Descripción
Módulo completo de reportes y exportación para el sistema de gestión de torneos.

## ✅ Funcionalidades Implementadas
- Estadísticas de torneos
- Reportes de jugadores  
- Métricas generales del sistema
- Exportación a PDF (Puppeteer)
- Exportación a Excel (ExcelJS)

## 🔐 Endpoints (Solo ADMIN)
- GET /reporting/tournament-stats?format=pdf|excel
- GET /reporting/players?format=pdf|excel&tournamentId=&teamId=
- GET /reporting/general-metrics?format=pdf|excel

## 🏗️ Servicios Creados
- ReportingService: Lógica de datos
- PdfService: Generación de PDFs
- ExcelService: Generación de Excel
