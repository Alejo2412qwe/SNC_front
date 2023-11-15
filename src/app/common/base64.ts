import { ToastrService } from 'ngx-toastr'; // Asegúrate de importar ToastrService o el módulo de notificaciones que estés usando

export function decodeBase64Download(base64Data: string, name: string, toastr: ToastrService) {
    try {
        const base64WithoutHeader = base64Data.replace(/^data:.*,/, "");

        const decodedData = atob(base64WithoutHeader);

        const byteCharacters = new Uint8Array(decodedData.length);

        for (let i = 0; i < decodedData.length; i++) {
            byteCharacters[i] = decodedData.charCodeAt(i);
        }

        const byteArray = new Blob([byteCharacters], { type: "image/jpeg" });
        const fileUrl = URL.createObjectURL(byteArray);

        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = name;
        link.click();

        toastr.info(
            'Imagen descargada correctamente',
            'Descargando...',
            {
                timeOut: 4000,
            }
        );

        URL.revokeObjectURL(fileUrl);
    } catch (error) {
        console.error("Error al decodificar la cadena base64:", error);
    }
}

export function decodeBase64PDF(base64Data: string, name: string, toastr: ToastrService) {
    try {
        // Eliminar encabezados o metadatos de la cadena base64
        const base64WithoutHeader = base64Data.replace(/^data:.*,/, "");

        const decodedData = atob(base64WithoutHeader); // Decodificar la cadena base64
        const byteCharacters = new Uint8Array(decodedData.length);

        for (let i = 0; i < decodedData.length; i++) {
            byteCharacters[i] = decodedData.charCodeAt(i);
        }

        const byteArray = new Blob([byteCharacters], { type: "application/pdf" });
        const fileUrl = URL.createObjectURL(byteArray);

        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = name;
        link.click();
        toastr.info(
            'Archivo descargado correctamente',
            'Descargando...',
            {
                timeOut: 4000,
            }
        );
        console.log("pdf descargado...");

        URL.revokeObjectURL(fileUrl);
    } catch (error) {
        console.error("Error al decodificar la cadena base64:", error);
    }
};


export function loadImg(base64Data: string, fileName: string) {
    try {
        // Eliminar encabezados o metadatos de la cadena base64
        const base64WithoutHeader = base64Data.replace(/^data:.*,/, "");

        const decodedData = atob(base64WithoutHeader); // Decodificar la cadena base64
        const byteCharacters = new Uint8Array(decodedData.length);

        for (let i = 0; i < decodedData.length; i++) {
            byteCharacters[i] = decodedData.charCodeAt(i);
        }

        const byteArray = new Blob([byteCharacters], { type: "application/pdf" });
        const fileUrl = URL.createObjectURL(byteArray);

        const link = document.createElement("a");
        link.href = fileUrl;
        // link.download = name;
        // link.click();

        console.log("pdf descargado...");

        URL.revokeObjectURL(fileUrl);
    } catch (error) {
        console.error("Error al decodificar la cadena base64:", error);
    }
}

export function base64PDFpreview(base64Data: string, fileName: string) {
    // Crear una URL de datos a partir del base64
    const dataUri = base64Data;

    // Abrir una nueva pestaña
    const newTab = window.open();
    if (newTab) {
        // Crear un documento HTML con un iframe para mostrar el PDF
        const htmlContent = `
             <html>
               <head>
                 <title>${fileName}</title>
               </head>
               <body>
                 <iframe src="${dataUri}" width="100%" height="100%"></iframe>
               </body>
             </html>
           `;

        newTab.document.open();
        newTab.document.write(htmlContent);
        newTab.document.close();
    } else {
        alert("El navegador ha bloqueado la apertura de una nueva pestaña. Por favor, permite ventanas emergentes e intenta nuevamente.");
    }
};

export function base64ToFile(base64String: string, fileName: string): File {

    // Eliminar encabezados o metadatos de la cadena base64
    const base64WithoutHeader = base64String.replace(/^data:.*,/, "");
    // Decodifica la cadena Base64
    const byteCharacters = atob(base64WithoutHeader);

    // Convierte los bytes decodificados en un arreglo de bytes
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Crea un Blob a partir del arreglo de bytes
    const blob = new Blob([byteArray], { type: 'application/octet-stream' });

    // Crea un File a partir del Blob
    return new File([blob], fileName, { type: 'application/octet-stream' });
}

