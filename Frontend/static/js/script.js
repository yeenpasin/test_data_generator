// import { getConfigForDataType } from './settingDatatypeComponant.js';

document.addEventListener('DOMContentLoaded', function () {
    const formRowsContainer = document.getElementById('form-rows');
    const addBtn = document.getElementById('addBtn');
    const clearBtn = document.getElementById('clearBtn');
    const generateForm = document.getElementById('generateForm');
    const popup = document.getElementById('myPopup');
    const popupYes = document.getElementById('popupYes');
    const popupNo = document.getElementById('popupNo');
    const formatElement = document.getElementById('format');
    const delimiterRow = document.getElementById('delimiterRow');
    const dataTypeModal = document.getElementById('dataTypeModal');
    const confirmModalBtn = document.getElementById('confirmModal');
    const span = document.getElementsByClassName("closeDatatypeModal")[0];

    let currentButton;
    let isMultiSelectEnabled = false;

    // เมื่อ datatype เปลี่ยนก็ให้ field name หรือ setting เปลี่ยนให้ตรง
    function updateFieldsAndSettings(dataRow, dataType) {
        const fieldNameElement = dataRow.querySelector('.field_name');
        const settingsContainer = dataRow.querySelector('.settings_container');
        const additionalOptions = dataRow.querySelector('.additional_options');

        // ใช้ฟังก์ชัน getConfigForDataType ที่ import มา
        const config = getConfigForDataType(dataType);

        if (config) {
            fieldNameElement.value = config.fieldName;
            settingsContainer.innerHTML = config.settingsHTML;
        }

        setSettingsEventListener(dataRow);
        updateAdditionalOptions(additionalOptions, dataType);
    }

    function getConfigForDataType(dataType) {
        const configMap = {
            'Name': {
                fieldName: '',
                settingsHTML: `
                    <select class="settings" name="settings">
                        <option value="" disabled selected style="display:none;">- Select -</option>
                        <option style="color: #351690;" value="FullName">Fullname (EN)</option>
                        <option style="color: #351690;" value="FirstName">FirstName (EN)</option>
                        <option style="color: #351690;" value="LastName">LastName (EN)</option>
                        <option style="color: #7c1a24;" value="ThaiFull">FullName (TH)</option>
                        <option style="color: #7c1a24;" value="ThaiFirst">FirstName (TH)</option>
                        <option style="color: #7c1a24;" value="ThaiLast">LastName (TH)</option>
                    </select>
                `
            },
            'Phone': {
                fieldName: 'phone_number',
                settingsHTML: '<input type="text" class="settings" name="settings" style="width:150px;" placeholder="เช่น +66 ###-###-####">'
            },
            'Email': {
                fieldName: 'email',
                settingsHTML: '<input type="text" class="settings" name="settings" style="width:150px" placeholder="เช่น gmail.com, hotmail.com">'
            },
            'Username': {
                fieldName: 'username',
                settingsHTML: '<input type="text" class="settings" name="settings" placeholder="No Setting" readonly>'
            },
            'password': {
                fieldName: 'password',
                settingsHTML: '<input type="text" class="settings" name="settings" placeholder="@ = a-z , # = 0-9">'
            },
            'IDcard': {
                fieldName: 'IDcard_number',
                settingsHTML: '<input type="text" class="settings" name="settings" placeholder="No Setting" readonly>'
            },
            'nameTitle': {
                fieldName: '',
                settingsHTML: `
                    <select class="settings" name="settings">
                        <option value="" disabled selected style="display:none;">- Select -</option>
                        <option style="color: #351690;" value="nametitleTh">NameTitle (TH)</option>
                        <option style="color: #351690;" value="nametitleEn">NameTitle (EN)</option>
                    </select>
                `
            },
            'job': {
                fieldName: '',
                settingsHTML: `
                    <select class="settings" name="settings">
                        <option value="" disabled selected style="display:none;">- Select -</option>
                        <option style="color: #351690;" value="jobTh">Job (TH)</option>
                        <option style="color: #351690;" value="jobEn">Job (EN)</option>
                    </select>
                `
            },
            'dateOfbirth': {
                fieldName: 'date_of_birth',
                settingsHTML: '<input type="text" class="settings" name="settings" placeholder="No Setting" readonly>'
            },
            'bankAccount': {
                fieldName: '',
                settingsHTML: `
                    <select class="settings" name="settings">
                        <option value="" disabled selected style="display:none;">- Select -</option>
                        <option value="bankName">BankName</option>
                        <option value="bankNameTh">BankName (TH)</option>
                        <option value="bankNameEn">BankName (EN)</option>
                        <option value="bankNumber">BankNumber</option>
                    </select>
                `
            },
            'Location': {
                fieldName: '',
                settingsHTML: `
                    <select class="settings" name="settings">
                        <option value="" disabled selected style="display:none;">- Select -</option>
                        <option value="defaultFormat">defaultFormat</option>
                        <option value="DMS">DMS</option>
                        <option value="DMM">DMM</option>
                        <option value="DD">DD</option>
                    </select>
                `
            },
            'wayPoint': {
                fieldName: 'waypoint',
                settingsHTML: '<input type="text" class="settings" name="settings" placeholder="NumWaypoint" style="width: 70px;">'
            },
            'country': {
                fieldName: 'country',
                settingsHTML: '<input type="text" class="settings" name="settings" placeholder="No Setting" readonly>'
            },
            'Address': {
                fieldName: '',
                settingsHTML: `
                    <select class="settings" name="settings">
                        <option value="" disabled selected style="display:none;">- Select -</option>
                        <option style="color: #351690;" value="AddressTh">Address (TH)</option>
                        <option style="color: #351690;" value="AddressEn">Address (EN)</option>
                    </select>
                `
            },
            'IPAddress': {
                fieldName: '',
                settingsHTML: `
                    <select class="settings" name="settings">
                        <option value="" disabled selected style="display:none;">- Select -</option>
                        <option value="ipv4">IPv4 address</option>
                        <option value="ipv6">IPv6 address</option>
                    </select>
                `
            },
            'postcode': {
                fieldName: 'postcode',
                settingsHTML: '<input type="text" class="settings" name="settings" placeholder="No Setting" readonly>'
            },
            'company': {
                fieldName: '',
                settingsHTML: `
                    <select class="settings" name="settings">
                        <option value="" disabled selected style="display:none;">- Select -</option>
                        <option style="color: #351690;" value="companyTh">Company (TH)</option>
                        <option style="color: #351690;" value="companyEn">Company (EN)</option>
                    </select>
                `
            },
            'custom': {
                fieldName: 'custom',
                settingsHTML: '<input type="text" class="settings" name="settings" placeholder="e.g. @#% = a1ก">'
            },
            'customNumber': {
                fieldName: '',
                settingsHTML: '<input type="text" class="settings" name="settings" placeholder="min , max">'
            },
            'color': {
                fieldName: 'color',
                settingsHTML: '<input type="text" class="settings" name="settings" placeholder="No Setting" readonly>'
            },
            'url': {
                fieldName: '',
                settingsHTML: `
                    <select class="settings" name="settings">
                        <option value="" disabled selected style="display:none;">- Select -</option>
                        <option value="URL">URL</option>
                        <option value="URI">URI Path</option>
                        <option value="imageURL">Image URL</option>
                    </select>
                `
            },
            'file': {
                fieldName: '',
                settingsHTML: `
                    <select class="settings" name="settings">
                        <option value="" disabled selected style="display:none;">- Select -</option>
                        <option value="audiofile">audio file</option>
                        <option value="imagefile">image file</option>
                        <option value="officefile">office file</option>
                        <option value="textfile">text file</option>
                        <option value="videofile">video file</option>
                    </select>
                `
            },
            'currency': {
                fieldName: '',
                settingsHTML: `
                    <select class="settings" name="settings">
                        <option value="" disabled selected style="display:none;">- Select -</option>
                        <option style="color: #351690;" value="curName">CurrencyName</option>
                        <option style="color: #351690;" value="curSymbol">Symbol</option>
                    </select>
                `
            },
            'text': {
                fieldName: '',
                settingsHTML: `
                    <select class="settings" name="settings">
                        <option value="" disabled selected style="display:none;">- Select -</option>
                        <option style="color: #351690;" value="textTh">Text (TH)</option>
                        <option style="color: #351690;" value="textEn">Text (EN)</option>
                    </select>
                `
            }
        };

        return configMap[dataType] || null;
    }



    // -----------------------------------------------------------------------------------

    //เซ็ตให้ additional_options ที่ซ่อนอยู่ โผล่ขึ้นมา

    function updateAdditionalOptions(additionalOptions, dataType) {
        if (['nameTitle', 'customNumber', 'Name', 'wayPoint'].includes(dataType)) {
            additionalOptions.style.display = 'block';
            configureAdditionalOptions(additionalOptions, dataType);
        } else {
            additionalOptions.style.display = 'none';
        }
    }

    function configureAdditionalOptions(additionalOptions, dataType) {
        const optionsConfig = {
            nameTitle: {
                decimal: 'none',
                name_lengthMax: 'none',
                fix_namelength: 'none',
                include: 'inline-block',
                exclude: 'inline-block',
                only: 'inline-block',
                firstLatLon: 'none',
                secLatLon: 'none'
            },
            customNumber: {
                decimal: 'inline-block',
                name_lengthMax: 'none',
                fix_namelength: 'none',
                include: 'none',
                exclude: 'none',
                only: 'none',
                firstLatLon: 'none',
                secLatLon: 'none'
            },
            Name: {
                decimal: 'none',
                name_lengthMax: 'inline-block',
                fix_namelength: 'inline-block',
                include: 'none',
                exclude: 'none',
                only: 'none',
                firstLatLon: 'none',
                secLatLon: 'none'
            },
            wayPoint: {
                decimal: 'none',
                name_lengthMax: 'none',
                fix_namelength: 'none',
                include: 'none',
                exclude: 'none',
                only: 'none',
                firstLatLon: 'inline-block',
                secLatLon: 'inline-block'
            }
        };

        const config = optionsConfig[dataType];
        if (config) {
            setDisplayStyle(additionalOptions, config);
        }
    }

    function setDisplayStyle(element, config) {
        for (const [key, value] of Object.entries(config)) {
            element.querySelector(`.${key}`).style.display = value;
        }
    }


    // -----------------------------------------------------------------------------------

    //เมื่อเลือก csv ก็ให้ delimiter dropdown แสดงขึ้นมา

    formatElement.addEventListener('change', function () {
        if (this.value === 'csv') {
            delimiterRow.style.display = 'block';
        }

        else {
            delimiterRow.style.display = 'none';
        }
    });

    // -----------------------------------------------------------------------------------

    //เงื่อนไขให้ field name เปลี่ยนตาม setting ที่เลือก กรณีที่ datatype นั้นมี setting หลายอัน
    const setSettingsEventListener = (dataRow) => {
        const dataTypeElement = dataRow.querySelector('.data_type');
        const fieldNameElement = dataRow.querySelector('.field_name');
        const settingsElement = dataRow.querySelector('.settings');

        if (settingsElement) {
            settingsElement.addEventListener('change', function () {
                const selectedSetting = settingsElement.value;
                const dataType = dataTypeElement.value;

                const fieldNameMapping = {
                    Name: {
                        FullName: 'full_name',
                        FirstName: 'first_name',
                        LastName: 'last_name',
                        ThaiFull: 'fullname_thai',
                        ThaiFirst: 'firstname_thai',
                        ThaiLast: 'lastname_thai'
                    },
                    Location: {
                        defaultFormat: 'location',
                        DMS: 'locationDMS',
                        DMM: 'locationDMM',
                        DD: 'locationDD'
                    },
                    Address: {
                        AddressTh: 'address_thai',
                        AddressEn: 'address_eng'
                    },
                    IDcard: 'IDcard_number',
                    job: {
                        jobTh: 'job_TH',
                        jobEn: 'job_En'
                    },
                    nameTitle: {
                        nametitleTh: 'nametitle_th',
                        nametitleEn: 'nametitle_en'
                    },
                    IPAddress: {
                        ipv4: 'IPv4_Address',
                        ipv6: 'IPv6_Address'
                    },
                    text: {
                        textTh: 'text_TH',
                        textEn: 'text_EN'
                    },
                    currency: {
                        curName: 'currency_name',
                        curSymbol: 'currency_symbol'
                    },
                    url: {
                        URL: 'url',
                        URI: 'uri',
                        imageURL: 'image_url'
                    },
                    file: {
                        audiofile: 'audio_file',
                        imagefile: 'image_file',
                        officefile: 'office_file',
                        textfile: 'text_file',
                        videofile: 'video_file'
                    },
                    bankAccount: {
                        bankName: 'bank_name',
                        bankNameTh: 'bankname_TH',
                        bankNameEn: 'bankname_EN',
                        bankNumber: 'bank_number'
                    },
                    company: {
                        companyTh: 'company_thai',
                        companyEn: 'company_Eng'
                    }
                };

                updateFieldName(fieldNameElement, fieldNameMapping, dataType, selectedSetting);
            });
        }
    };

    const updateFieldName = (fieldNameElement, fieldNameMapping, dataType, selectedSetting) => {
        if (typeof fieldNameMapping[dataType] === 'string') {
            fieldNameElement.value = fieldNameMapping[dataType];
        } else if (fieldNameMapping[dataType] && fieldNameMapping[dataType][selectedSetting]) {
            fieldNameElement.value = fieldNameMapping[dataType][selectedSetting];
        }
    };



    // -----------------------------------------------------------------------------------

    /*ปุ่ม copy*/
    const copyBtn = document.getElementById('copyBtn');
    const generatedCode = document.getElementById('generatedCode');

    copyBtn.addEventListener('click', function () {
        const codeToCopy = generatedCode.querySelector('pre').textContent;
        navigator.clipboard.writeText(codeToCopy)
            .then(() => {
                alert('Code copied to clipboard!');
            })
            .catch(err => {
                console.error('Unable to copy:', err);
            });

    });

    // -----------------------------------------------------------------------------------

    /* ฟังก์ชั่นเงื่อนไขตรวจสอบเมื่อยังไม่ได้ทำการกรอกหรือเลือกข้อมูลที่ควร */
    const validateForm = () => {
        if (!areDataTypesSelected()) {
            alert("Please select Data Type");
            return false;
        }

        if (!areSettingsValid()) {
            alert("You haven't set the settings yet.");
            return false;
        }

        if (!isFormatSelected()) {
            alert("Please select Format");
            return false;
        }


        return true;
    };

    const areDataTypesSelected = () => {
        const dataTypeElements = document.querySelectorAll('.data_type');
        return Array.from(dataTypeElements).every(element => element.value !== "");
    };

    const areSettingsValid = () => {
        const formRows = document.querySelectorAll('.form-row');

        return Array.from(formRows).every(row => {
            const dataTypeElement = row.querySelector('.data_type');
            const settingsElement = row.querySelector('.settings');

            // if (!dataTypeElement || !settingsElement) {
            //     return true; // Skip rows that do not have dataTypeElement or settingsElement
            // }

            if (['Username', 'IDcard', 'country', 'postcode', 'dateOfbirth', 'color'].includes(dataTypeElement.value)) {
                return true; // ข้ามการตรวจสอบสำหรับ datatype บางตัว เพราะมันไม่มีการกรอก setting
            }

            return settingsElement.value.trim() !== ""; // Validate settings value
        });
    };

    const isFormatSelected = () => {
        const formatElement = document.getElementById('format');
        return formatElement.value !== "";
    };


    // -----------------------------------------------------------------------------------

    /* ฟังก์ชันปุ่ม generate และทำให้หลังจากกด genearate ค่าเดิมไม่ถูกรีเซ็ต */
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }

        const formData = collectFormData();

        try {
            const response = await fetch('/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json(); // รับข้อมูลเป็น JSON
            document.getElementById('generatedCode').innerHTML = `<pre>${result.data}</pre>`; // ใช้ result.data
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const collectFormData = () => {
        const rows = document.querySelectorAll('.form-row');
        const data = {
            num_records: document.getElementById('num_records').value,
            format: document.getElementById('format').value,
            delimiter: document.getElementById('delimiter').value,
            rows: []
        };

        rows.forEach(row => {
            data.rows.push({
                data_type: row.querySelector('.data_type').value,
                field_name: row.querySelector('.field_name').value,
                settings: row.querySelector('.settings').value,
                include: row.querySelector('.include')?.value || '',
                exclude: row.querySelector('.exclude')?.value || '',
                only: row.querySelector('.only')?.value || '',
                decimal: row.querySelector('.decimal')?.value || '',
                name_lengthMax: row.querySelector('.name_lengthMax')?.value || '',
                fix_namelength: row.querySelector('.fix_namelength')?.value || '',
                firstLatLon: row.querySelector('.firstLatLon')?.value || '',
                secLatLon: row.querySelector('.secLatLon')?.value || ''
            });
        });

        return data;
    };

    generateForm.addEventListener('submit', handleFormSubmit);


    // -----------------------------------------------------------------------------------

    //ปุ่ม delete เฉพาะแถว เมื่อแถวมีมากกว่า 1 จะสามารถลบได้ แต่ถ้าเหลือแถวสุดท้ายจะไม่สามารถลบได้
    const setDeleteRowEventListener = (dataRow) => {
        const deleteRowBtn = dataRow.querySelector('.deleteRowBtn');
        deleteRowBtn.addEventListener('click', function () {
            if (formRowsContainer.children.length > 1) {
                dataRow.remove();
            } else {
                alert('Cannot delete the last row');
            }
        });
    };

    // -----------------------------------------------------------------------------------

    /* ปุ่มแอดแถว */
    addBtn.addEventListener('click', function () {

        const dataRow = document.createElement('div');
        dataRow.className = 'form-row';

        const rowIndex = formRowsContainer.children.length;
        dataRow.innerHTML = ` 
            <div>
                <button type="button" class="select-data-type" style="font-size: 10px;">Select Data Type</button>
                <input type="hidden" class="data_type" name="data_type" value="">
            </div>
            <div>
                <input type="text" class="field_name" name="field_name" value="">
            </div>
            <div class="settings_container">
                <select class="settings" name="settings">
                    <option value="" disabled selected style="display:none;">- Select -</option>
                </select>
            </div>
            <div class="additional_options" style="display: none;">
                <input type="text" class="include" name="include" placeholder="Include">
                <input type="text" class="exclude" name="exclude" placeholder="Exclude">
                <input type="text" class="only" name="only" placeholder="Only">
                <input type="text" class="decimal" name="decimal" placeholder="Decimal">
                <input type="text" class="fix_namelength" name="fix_namelength" placeholder="Fix Length">
                <input type="text" class="name_lengthMax" name="name_lengthMax" placeholder="Max Length">
                <input type="text" class="firstLatLon" name="firstLatLon" style="width: 80px;" placeholder="Lat,Lon (Start)">
                <input type="text" class="secLatLon" name="secLatLon" style="width: 80px;" placeholder="Lat,Lon (End)">
            </div>
            <div class="moveDelbtn">
                <button type="button" class="drag-handle"><i class="fas fa-grip-vertical"></i></button>
                <button type="button" class="deleteRowBtn"><i class="fas fa-trash-alt"></i></button>
            </div>
                       
        `;
        formRowsContainer.appendChild(dataRow);

        //ทำให้หน้าต่างเลื่อนตามเมื่อเพิ่มแถวเยอะจนเลยหน้าจอ
        dataRow.scrollIntoView({ behavior: 'smooth' });


        setDataTypeEventListener(dataRow);
        setSettingsEventListener(dataRow);
        setDeleteRowEventListener(dataRow);
        updateFieldsAndSettings(dataRow);

        closeModal(dataRow);
        makeRowsDraggable(dataRow);

    });

    // -----------------------------------------------------------------------------------

    // ฟังก์ชันปิด modal และรีเซ็ตหัวลูกศร และ อื่นๆ
    function closeModal() {
        dataTypeModal.style.display = "none";

        // รีเซ็ตลูกศร
        document.querySelectorAll('.category-header').forEach(header => {
            header.classList.remove('active');
        });

        resetMultiSelect();


    }

    // รีเซ็ตเลือกหลายรายการเมื่อปิด modal
    function resetMultiSelect() {
        isMultiSelectEnabled = false;
        multiSelectToggle.checked = false;
        document.querySelectorAll('.multi-select-checkbox').forEach(checkbox => {
            checkbox.style.display = 'none';
            checkbox.checked = false;
        });
        confirmModalBtn.style.display = 'none';
    }

    // -----------------------------------------------------------------------------------



    // Modal 

    //การคลิกปุ่ม select datatype

    function setDataTypeEventListener(dataRow) {
        const selectButton = dataRow.querySelector('.select-data-type');

        selectButton.onclick = function () {
            dataTypeModal.style.display = "flex";
            currentButton = this;
            currentRow = dataRow;

            // ซ่อนทุก submenu เมื่อเปิด modal
            document.querySelectorAll('.sub-menu').forEach(submenu => {
                submenu.style.display = 'none';
            });
        }

        // เพิ่ม event listener สำหรับการเปลี่ยนแปลง data type
        dataRow.querySelector('.data_type').addEventListener('change', function () {
            updateAdditionalOptions(dataRow.querySelector('.additional_options'), this.value);
        });
    }

    // จัดการกับการคลิกที่หัวข้อใหญ่ของหน้าต่าง datatype
    document.querySelectorAll('.category-header').forEach(header => {
        header.addEventListener('click', function () {
            event.stopPropagation();
            const category = this.getAttribute('data-category');
            const submenu = document.getElementById(`${category}-submenu`);

            // สลับคลาส 'active' สำหรับการหมุนลูกศร
            this.classList.toggle('active');

            // ถ้า submenu ที่คลิกกำลังแสดงอยู่ ให้ซ่อนมัน
            if (submenu.style.display === 'block') {
                submenu.style.display = 'none';
            } else {

                // ซ่อนทุก submenu ก่อนหน้าเมื่อคลิกหัวข้ออื่น
                document.querySelectorAll('.sub-menu').forEach(menu => {
                    menu.style.display = 'none';
                });

                // ทำให้เวลาคลิกหัวข้ออื่น แล้วลูกศรของหัวข้อก่อนหน้าที่คลิกรีกลับไปเหมือนเดิม
                document.querySelectorAll('.category-header').forEach(head => {
                    if (head !== this) {
                        head.classList.remove('active');
                    }
                });

                // แสดง submenu ที่เลือก
                submenu.style.display = 'block';
            }
        });
    });

    // จัดการการเลือกหลายรายการ


    // เมื่อคลิกปุ่ม select multiple items จะมี check box ของแต่ละเมนูขึ้นมาและ ปุ่ม confirm modal
    multiSelectToggle.addEventListener('change', function () {
        isMultiSelectEnabled = this.checked;
        document.querySelectorAll('.multi-select-checkbox').forEach(checkbox => {
            checkbox.style.display = isMultiSelectEnabled ? 'inline-block' : 'none';
        });
        confirmModalBtn.style.display = isMultiSelectEnabled ? 'inline-block' : 'none';
    });



    document.querySelectorAll('.sub-menu li, .data-type-menu li').forEach(item => {
        item.addEventListener('click', function () {
            //if (!currentButton || !currentRow) return; // ป้องกันกรณีที่ไม่ได้เลือกแถว (ไม่น่าได้ใช้)

            if (isMultiSelectEnabled) {
                const checkbox = this.querySelector('.multi-select-checkbox');
                checkbox.checked = !checkbox.checked;

            } else {

                const dataType = this.getAttribute('data-type');
                const displayText = this.textContent; // ดึงข้อความที่แสดงใน <li>
                currentButton.textContent = displayText; // ตั้งค่าข้อความของปุ่มเป็นข้อความใน <li>

                currentRow.querySelector('.data_type').value = dataType; // ยังคงตั้งค่า value ของ hidden input เป็นค่า data-type
                closeModal();

                updateFieldsAndSettings(currentRow, dataType);
            }
        });
    });


    //ให้สร้างแุถวใหม่สำหรับการเลือกหลายรายการ เช่น เวลาติ๊กหลายๆอันก็ให้มันขึ้นมาหลายๆแถวตามจำนวนที่เราเลือก

    function createFormRow(dataType, displayText) {
        const dataRow = document.createElement('div');
        dataRow.className = 'form-row';
        formRowsContainer.appendChild(dataRow);

        dataRow.innerHTML = `
            <div>
                <button type="button" class="select-data-type" style="font-size: 10px;">${displayText}</button>
                <input type="hidden" class="data_type" name="data_type" value="${dataType}">
            </div>
            <div>
                <input type="text" class="field_name" name="field_name" value="">
            </div>
            <div class="settings_container">
                <select class="settings" name="settings">
                    <option value="" disabled selected style="display:none;">- Select -</option>
                </select>
            </div>
            <div class="additional_options" style="display: none;">
                <input type="text" class="include" name="include" placeholder="Include">
                <input type="text" class="exclude" name="exclude" placeholder="Exclude">
                <input type="text" class="only" name="only" placeholder="Only">
                <input type="text" class="decimal" name="decimal" placeholder="Decimal">
                <input type="text" class="fix_namelength" name="fix_namelength" placeholder="Fix Length">
                <input type="text" class="name_lengthMax" name="name_lengthMax" placeholder="Max Length">
                <input type="text" class="firstLatLon" name="firstLatLon" placeholder="Lat,Lon (Start)">
                <input type="text" class="secLatLon" name="secLatLon" placeholder="Lat,Lon (End)">
            </div>
            <div class="moveDelbtn">
                <button type="button" class="drag-handle"><i class="fas fa-grip-vertical"></i></button>
                <button type="button" class="deleteRowBtn"><i class="fas fa-trash-alt"></i></button>
            </div>
        `;

        setDataTypeEventListener(dataRow);
        setSettingsEventListener(dataRow);
        setDeleteRowEventListener(dataRow);
        updateFieldsAndSettings(dataRow, dataType);
        makeRowsDraggable();

        return dataRow;
    }

    //ปุ่มยืนยันหลังจากเลือกหลายรายการ

    // ปุ่มยืนยันหลังจากเลือกหลายรายการ
    confirmModalBtn.addEventListener('click', function () {
        const selectedItems = [];
        document.querySelectorAll('.multi-select-checkbox:checked').forEach(checkbox => {
            const parentLi = checkbox.closest('li');
            const dataType = parentLi.getAttribute('data-type');
            const displayText = parentLi.textContent.trim();
            selectedItems.push({ dataType, displayText });
        });

        if (selectedItems.length > 0) {
            // อัปเดตแถวปัจจุบันหลังจากกดปุ่มเลือกหลายรายการ    
            updateExistingRow(currentRow, selectedItems[0].dataType, selectedItems[0].displayText);

            // สร้างแถวใหม่สำหรับรายการที่เหลือโดยเริ่มตั้งแต่ index 1 
            for (let i = 1; i < selectedItems.length; i++) {
                createFormRow(selectedItems[i].dataType, selectedItems[i].displayText);
            }
        }

        closeModal();
    });


    //ฟังก์ชั่นเกี่ยวกับการอัพเดตแถวปัจจุบันหลังจากกด confirm modal

    function updateExistingRow(row, dataType, displayText) {
        const selectButton = row.querySelector('.select-data-type');
        const dataTypeInput = row.querySelector('.data_type');

        selectButton.textContent = displayText;
        dataTypeInput.value = dataType;

        updateFieldsAndSettings(row, dataType);
    }


    //คลิกกากบาทและหน้าต่างจะปิด

    span.onclick = closeModal;

    //คลิกนอกกรอบและหน้าต่างจะปิด

    window.onclick = function (event) {
        if (event.target == dataTypeModal) {
            closeModal();
        }
    }

    // -----------------------------------------------------------------------------------


    // Pop Up ของปุ่ม clear

    // คลิกปุ่ม clear แล้วแสดง popup

    clearBtn.addEventListener('click', function () {
        popup.style.display = "block";
    });


    // กำหนดสิ่งที่จะเกิดขึ้นเมื่อกดปุ่ม clear //

    /* ลบยกเว้นแถวแรก */
    popupYes.addEventListener('click', function () {
        const formRows = formRowsContainer.querySelectorAll('.form-row');
        formRows.forEach((row, index) => {
            if (index !== 0) {
                row.remove();
            }
        });

        // รีเซ็ต number of record
        const numberOfRecordsInput = document.getElementById('num_records');
        numberOfRecordsInput.value = '';

        // รีเซ็ต format dropdown
        const formatDropdown = document.getElementById('format');
        formatDropdown.value = '';

        //รีเซ็ตหน้า output
        const outputPage = document.getElementById('generatedCode');
        outputPage.innerHTML = ``;



        /* reset ค่าของแถวแรกให้เป็นค่าเริ่มต้น */
        const firstRow = formRowsContainer.querySelector('.form-row')
        if (firstRow) {
            const selectDataTypeButton = firstRow.querySelector('.select-data-type');
            const fieldNameElement = firstRow.querySelector('.field_name')
            const settingsElement = firstRow.querySelector('.settings_container')

            selectDataTypeButton.textContent = 'Select Data Type';
            fieldNameElement.value = '';
            settingsElement.innerHTML = `
                    <select class="settings" name="settings">
                        <option value="" disabled selected style="display:none;">- Select -</option>
                    </select>
                    `;

        }

        // ซ่อน delimiter row
        const delimiterRow = document.getElementById('delimiterRow');
        if (delimiterRow) {
            delimiterRow.style.display = 'none';
        }

        popup.style.display = "none";

        //ลบพวก additional_options
        const moreoption = document.querySelector('.additional_options');
        if (moreoption) {
            moreoption.style.display = 'none';
        }

        // เคลียร์ค่าฟิลด์ภายใน .additional_options
        const includeField = moreoption.querySelector('.include');
        const excludeField = moreoption.querySelector('.exclude');
        const onlyField = moreoption.querySelector('.only');
        const decimalField = moreoption.querySelector('.decimal');
        const name_lengthMaxField = moreoption.querySelector('.name_lengthMax');
        const fix_namelengthField = moreoption.querySelector('.fix_namelength');
        const firstLatLon = moreoption.querySelector('.firstLatLon');
        const secLatLon = moreoption.querySelector('.secLatLon');

        if (includeField) includeField.value = '';
        if (excludeField) excludeField.value = '';
        if (onlyField) onlyField.value = '';
        if (decimalField) decimalField.value = '';
        if (name_lengthMaxField) name_lengthMaxField.value = '';
        if (fix_namelengthField) fix_namelengthField.value = '';
        if (firstLatLon) firstLatLon.value = '';
        if (secLatLon) secLatLon.value = '';

        popup.style.display = "none";

    });


    /* ปุ่ม cencel ของ popup */
    popupNo.addEventListener('click', function () {
        popup.style.display = "none";
    });

    // -----------------------------------------------------------------------------------


    // ปุ่ม download
    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.addEventListener('click', function () {
        const generatedCode = document.getElementById('generatedCode').textContent;
        const format = document.getElementById('format').value;
        let blob;



        /* ช่วยให้ปุ่ม download ให้ file csv รองรับภาษาไทย */
        if (format === 'csv') {
            const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
            blob = new Blob([bom, generatedCode], { type: 'text/csv;charset=utf-8' });
        } else {
            blob = new Blob([generatedCode], { type: 'text/plain;charset=utf-8' });
        }

        // สร้างลิงก์ดาวน์โหลด
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `generated_data.${format}`;
        downloadLink.click();
    });

    // -----------------------------------------------------------------------------------

    //ปุ่ม Save Template

    // เมื่อผู้ใช้เลือกดาวน์โหลดเป็น template
    const saveTemplateBtn = document.getElementById('saveTemplateBtn');
    saveTemplateBtn.addEventListener('click', function (event) {
        event.stopPropagation(); // ป้องกันการทำงานของเหตุการณ์อื่น
        event.preventDefault(); // ป้องกันการทำงานที่ไม่ต้องการ
        downloadTemplate();
    });


    // ฟังก์ชั่นการดาวน์โหลด template
    function downloadTemplate() {
        const template = createTemplate();
        const format = document.getElementById('format').value; // ยังคงดึงค่า format ที่ผู้ใช้เลือก
        let blob;
        let content;

        // ปรับโครงสร้าง JSON ให้ใส่ค่า format ที่ผู้ใช้เลือก
        template.format = format;

        content = JSON.stringify(template, null, 2); // แปลง template เป็น JSON ที่จัดรูปแบบ
        blob = new Blob([content], { type: 'application/json;charset=utf-8' });

        // สร้างลิงก์ดาวน์โหลด
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'generated_data_template.json';
        downloadLink.click();
    }


    function createTemplate() {
        const template = {
            num_records: document.getElementById('num_records').value,
            format: document.getElementById('format').value,
            delimiter: document.getElementById('delimiter').value,
            rows: []
        };

        document.querySelectorAll('.form-row').forEach(row => {
            const rowData = {
                dataType: row.querySelector('.data_type').value,
                displayText: row.querySelector('.select-data-type').textContent,
                fieldName: row.querySelector('.field_name').value,
                settings: row.querySelector('.settings') ? row.querySelector('.settings').value : '',
                include: row.querySelector('.include') ? row.querySelector('.include').value : '',
                exclude: row.querySelector('.exclude') ? row.querySelector('.exclude').value : '',
                only: row.querySelector('.only') ? row.querySelector('.only').value : '',
                decimal: row.querySelector('.decimal') ? row.querySelector('.decimal').value : '',
                fixNameLength: row.querySelector('.fix_namelength') ? row.querySelector('.fix_namelength').value : '',
                nameMaxLength: row.querySelector('.name_lengthMax') ? row.querySelector('.name_lengthMax').value : '',
                firstLatLon: row.querySelector('.firstLatLon') ? row.querySelector('.firstLatLon').value : '',
                secLatLon: row.querySelector('.secLatLon') ? row.querySelector('.secLatLon').value : '',
            };
            template.rows.push(rowData);
        });

        return template;
    }

    // ------------------------------------------------------------------------------------


    /*  ปุ่ม move row คลิกลากย้ายระหว่างแถว */
    function makeRowsDraggable() {
        const dragHandles = document.querySelectorAll('.drag-handle');
        const formRowsContainer = document.getElementById('form-rows');

        dragHandles.forEach(dragHandle => {
            dragHandle.addEventListener('mousedown', function (e) {
                const dataRow = this.closest('.form-row');
                const initialY = e.pageY;
                const formRows = Array.from(formRowsContainer.children);

                let currentIndex = formRows.indexOf(dataRow);

                function onMouseMove(e) {
                    const deltaY = e.pageY - initialY;
                    dataRow.style.transform = `translateY(${deltaY}px)`;

                    const closestRow = formRows.reduce((prev, curr) => {
                        const rect = curr.getBoundingClientRect();
                        const distance = Math.abs(rect.top - e.clientY);
                        return distance < prev.distance ? { row: curr, distance: distance } : prev;
                    }, { row: null, distance: Infinity }).row;

                    const targetIndex = formRows.indexOf(closestRow);
                    if (targetIndex !== -1 && targetIndex !== currentIndex) {
                        formRowsContainer.insertBefore(dataRow, targetIndex > currentIndex ? closestRow.nextSibling : closestRow);
                        currentIndex = targetIndex;
                    }
                }

                function onMouseUp() {
                    dataRow.style.transition = 'transform 0.2s ease';
                    dataRow.style.transform = 'translateY(0)';
                    setTimeout(() => {
                        dataRow.style.transition = '';
                    }, 200);

                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                }

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            });
        });
    }

    // ------------------------------------------------------------------------------------

    // นับจำนวนไอเทมของหัวข้อย่อยใน modal และแสดงจำนวนบน header 
    function updateCategoryHeader() {
        const personalHeader = document.querySelector('.category-header[data-category="personal"]');
        const personalsubmenuItems = document.querySelectorAll('#personal-submenu li');
        const locationHeader = document.querySelector('.category-header[data-category="location"]');
        const locationsubmenuItems = document.querySelectorAll('#location-submenu li');
        const otherHeader = document.querySelector('.category-header[data-category="other"]');
        const othersubmenuItems = document.querySelectorAll('#other-submenu li');


        personalHeader.innerHTML = `Personal Data (${personalsubmenuItems.length})`;
        locationHeader.innerHTML = `Location Data (${locationsubmenuItems.length})`;
        otherHeader.innerHTML = `Other Data (${othersubmenuItems.length})`;
    }

    updateCategoryHeader();

    // ------------------------------------------------------------------------------------

    /* จัดการการทำงานของแถวต้นตำรับ แถวแรก */
    const initialFormRow = formRowsContainer.querySelector('.form-row');
    if (initialFormRow) {
        setDataTypeEventListener(initialFormRow);
        setSettingsEventListener(initialFormRow);
        setDeleteRowEventListener(initialFormRow);
        updateFieldsAndSettings(initialFormRow);
        makeRowsDraggable();
    }

    // ------------------------------------------------------------------------------------

    // open file

    openFileBtn.addEventListener('click', function () {
        fileInput.click();
    });

    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                try {
                    const template = JSON.parse(e.target.result);
                    loadTemplate(template);
                } catch (error) {
                    console.error('Error parsing file:', error);
                    alert('Invalid file format. Please select a valid JSON file.');
                }
            };
            reader.readAsText(file);
        }
    });

    function loadTemplate(template) {
        // Clear existing rows
        clearAllRows();

        // Load number of records
        document.getElementById('num_records').value = template.num_records || '';

        // Load format
        document.getElementById('format').value = template.format || '';

        // Load delimiter if format is CSV
        if (template.format === 'csv') {
            document.getElementById('delimiter').value = template.delimiter || ',';
            document.getElementById('delimiterRow').style.display = 'block';
        } else {
            document.getElementById('delimiterRow').style.display = 'none';
        }

        // Load rows
        let firstRowLoaded = false; // Flag to track if first row is loaded

        template.rows.forEach((row, index) => {
            if (index === 0) {
                // อัพเดตแถวแรกด้วยข้อมูลจาก template
                const firstRow = document.querySelector('.form-row');
                if (firstRow) {
                    // เพิ่มบรรทัดนี้เพื่ออัพเดต settings ให้สอดคล้องกับ datatype
                    updateFieldsAndSettings(firstRow, row.dataType);
                    firstRow.querySelector('.select-data-type').textContent = row.displayText || 'Select Data Type';
                    firstRow.querySelector('.data_type').value = row.dataType || '';
                    firstRow.querySelector('.field_name').value = row.fieldName || '';


                    const settingsElement = firstRow.querySelector('.settings');
                    if (settingsElement) {
                        settingsElement.value = row.settings || '';



                    }
                    // Set additional options
                    const additionalOptions = firstRow.querySelector('.additional_options');
                    if (additionalOptions) {
                        additionalOptions.querySelector('.include').value = row.include || '';
                        additionalOptions.querySelector('.exclude').value = row.exclude || '';
                        additionalOptions.querySelector('.only').value = row.only || '';
                        additionalOptions.querySelector('.decimal').value = row.decimal || '';
                        additionalOptions.querySelector('.fix_namelength').value = row.fixNameLength || '';
                        additionalOptions.querySelector('.name_lengthMax').value = row.nameMaxLength || '';
                        additionalOptions.querySelector('.firstLatLon').value = row.firstLatLon || '';
                        additionalOptions.querySelector('.secLatLon').value = row.secLatLon || '';
                    }

                    firstRowLoaded = true;
                }
            } else {
                // สำหรับแถวอื่นที่ไม่ใช่แถวแรก
                const newRow = createFormRow(row.dataType, row.displayText);
                updateExistingRow(newRow, row.dataType, row.displayText);

                // Set field name
                newRow.querySelector('.field_name').value = row.fieldName || '';

                // Set settings
                const settingsElement = newRow.querySelector('.settings');
                if (settingsElement) {
                    settingsElement.value = row.settings || '';
                }

                // Set additional options
                const additionalOptions = newRow.querySelector('.additional_options');
                if (additionalOptions) {
                    additionalOptions.querySelector('.include').value = row.include || '';
                    additionalOptions.querySelector('.exclude').value = row.exclude || '';
                    additionalOptions.querySelector('.only').value = row.only || '';
                    additionalOptions.querySelector('.decimal').value = row.decimal || '';
                    additionalOptions.querySelector('.fix_namelength').value = row.fixNameLength || '';
                    additionalOptions.querySelector('.name_lengthMax').value = row.nameMaxLength || '';
                    additionalOptions.querySelector('.firstLatLon').value = row.firstLatLon || '';
                    additionalOptions.querySelector('.secLatLon').value = row.secLatLon || '';
                }
            }
        });

        // If the first row is not loaded from template, reset it
        if (!firstRowLoaded) {
            resetRow(document.querySelector('.form-row'));
        }
    }


    function clearAllRows() {
        const formRows = document.querySelectorAll('.form-row');
        formRows.forEach((row, index) => {
            if (index !== 0) {
                row.remove();
            }
        });

        // Reset the first row
        const firstRow = document.querySelector('.form-row');
        if (firstRow) {
            resetRow(firstRow);
        }
    }

    function resetRow(row) {
        const selectDataTypeButton = row.querySelector('.select-data-type');
        const fieldNameElement = row.querySelector('.field_name');
        const settingsElement = row.querySelector('.settings_container');
        const additionalOptions = row.querySelector('.additional_options');

        selectDataTypeButton.textContent = 'Select Data Type';
        fieldNameElement.value = '';
        settingsElement.innerHTML = `
            <select class="settings" name="settings">
                <option value="" disabled selected style="display:none;">- Select -</option>
            </select>
        `;
        additionalOptions.style.display = 'none';

        // Reset additional options fields
        additionalOptions.querySelectorAll('input').forEach(input => {
            input.value = '';
        });
    }

});