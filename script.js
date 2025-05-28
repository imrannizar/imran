// Borang Rayuan Kolej

document.addEventListener('DOMContentLoaded', () => {

    const appealForm = document.getElementById('appealForm');
    const formResultDiv = document.getElementById('form-result');

    
    const showMessage = (message, isError = false) => {
        formResultDiv.innerHTML = message;
        formResultDiv.style.display = 'block';
        if (isError) {
            formResultDiv.style.backgroundColor = '#ffdddd'; 
            formResultDiv.style.borderColor = '#ff0000'; 
        } else {
            formResultDiv.style.backgroundColor = '#e9f7ff'; 
            formResultDiv.style.borderColor = '#007bff'; 
        }
    };

    
    const isValidIC = (ic) => {
        const icRegex = /^\d{12}$/; 
        return icRegex.test(ic);
    };

    
    const isValidPhoneNumber = (phone) => {
        const cleanedPhone = phone.replace(/[^0-9]/g, ''); 
        return cleanedPhone.length >= 10 && cleanedPhone.length <= 11; 
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    
    if (appealForm) {
        appealForm.addEventListener('submit', function(event) {
            event.preventDefault();

            formResultDiv.innerHTML = '';
            formResultDiv.style.display = 'none';

            
            const formData = {
                applicationType: document.getElementById('applicationType').value, 
                fullName: document.getElementById('fullName').value.trim(), 
                studentId: document.getElementById('studentId').value.trim(), 
                icNo: document.getElementById('icNo').value.trim(), 
                course: document.getElementById('course').value.trim(), 
                semester: document.getElementById('semester').value.trim(), 
                gender: document.getElementById('gender').value, 
                mobileNo: document.getElementById('mobileNo').value.trim(), 
                email: document.getElementById('email').value.trim(), 
                fatherName: document.getElementById('fatherName').value.trim(), 
                address: document.getElementById('address').value.trim(), 
                contactPhone: document.getElementById('contactPhone').value.trim() 
            };

            
            let validationErrors = [];

            
            for (const key in formData) {
                if (formData[key] === '') { 
                    
                    let fieldLabel = document.querySelector(`label[for="${key}"]`)?.textContent.replace(':', '').trim() || key;
                    if (key === 'applicationType') fieldLabel = 'Application Type (RAYUAN)';
                    validationErrors.push(`Please fill in the '${fieldLabel}' field.`);
                }
            }

            if (formData.icNo !== '' && !isValidIC(formData.icNo)) {
                validationErrors.push('Format Nombor IC tidak sah. Sila masukkan tepat 12 digit (tiada sempang)');
            }
            if (formData.mobileNo !== '' && !isValidPhoneNumber(formData.mobileNo)) {
                validationErrors.push('Nombor Telefon Tidak Sah. Sila masukkan 10 atau 11 digit.');
            }
            if (formData.email !== '' && !isValidEmail(formData.email)) {
                validationErrors.push('Format E-mel tidak sah. Sila masukkan alamat e-mel yang sah.');
            }
            if (formData.contactPhone !== '' && !isValidPhoneNumber(formData.contactPhone)) {
                 validationErrors.push('Format Telefon Penjaga tidak sah. Sila masukkan 10 atau 11 digit.');
            }

            if (validationErrors.length > 0) {
                const errorMessage = `
                    <h3>Permohonan Tidak Berjaya!</h3>
                    <ul>
                        ${validationErrors.map(error => `<li>${error}</li>`).join('')}
                    </ul>
                `;
                showMessage(errorMessage, true); 
                return; 
            }

            
            let resultHTML = '<h3>Butiran Borang Rayuan</h3>';
            resultHTML += '<p><strong>Tahap Pengajian:</strong> ' + formData.applicationType + '</p>';
            resultHTML += '<p><strong>Nama penuh:</strong> ' + formData.fullName + '</p>';
            resultHTML += '<p><strong>Nombor Pelajar:</strong> ' + formData.studentId + '</p>';
            resultHTML += '<p><strong>Nombor IC:</strong> ' + formData.icNo + '</p>';
            resultHTML += '<p><strong>Kursus:</strong> ' + formData.course + '</p>';
            resultHTML += '<p><strong>Semester:</strong> ' + formData.semester + '</p>';
            resultHTML += '<p><strong>Jantina:</strong> ' + formData.gender + '</p>';
            resultHTML += '<p><strong>Nombor Telefon(H/P):</strong> ' + formData.mobileNo + '</p>';
            resultHTML += '<p><strong>E-mel:</strong> ' + formData.email + '</p>';
            resultHTML += '<p><strong>Nama Penjaga:</strong> ' + formData.fatherName + '</p>';
            resultHTML += '<p><strong>Alamat Penjaga:</strong> ' + formData.address + '</p>';
            resultHTML += '<p><strong>Nombor Telefon (Penjaga):</strong> ' + formData.contactPhone + '</p>';
            
            showMessage(resultHTML, false); 

        });
    }

    console.log("JavaScript file loaded and ready with updated phone number validation (10-11 digits).");
});