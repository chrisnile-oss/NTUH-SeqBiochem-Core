document.addEventListener('DOMContentLoaded', function () {
    // ==========================================
    // 1. 第一頁：服務大類選擇與直接點擊換頁邏輯
    // ==========================================
    let selectedCategory = '';
    const serviceCards = document.querySelectorAll('.service-type-card');
    const step0 = document.getElementById('step0');
    const step1 = document.getElementById('step1');

    serviceCards.forEach(card => {
        card.addEventListener('click', function () {
            if (this.classList.contains('disabled-card')) {
                alert('此服務項目尚未開放，敬請期待！');
                return;
            }

            serviceCards.forEach(c => c.classList.remove('border-primary', 'border-success', 'border-info', 'shadow-lg', 'selected-card'));
            
            this.classList.add('border-success', 'shadow-lg', 'selected-card');
            selectedCategory = this.getAttribute('data-category');

            step0.classList.add('d-none');
            step1.classList.remove('d-none');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // ==========================================
    // 2. 多步驟表單頁面切換控制
    // ==========================================
    const stepDetail = document.getElementById('stepDetail');
    const step2 = document.getElementById('step2');

    const backToStep0Btn = document.getElementById('backToStep0Btn');
    if (backToStep0Btn) {
        backToStep0Btn.addEventListener('click', function () {
            step1.classList.add('d-none');
            step0.classList.remove('d-none');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            const identity = document.getElementById('applicantIdentity').value;
            const piName = document.getElementById('piName').value;
            const piUnit = document.getElementById('piUnit').value;
            const piTitle = document.getElementById('piTitle').value;
            const piEmail = document.getElementById('piEmail').value;
            const piPhone = document.getElementById('piPhone').value;
            
            const appName = document.getElementById('applicantName').value;
            const appUnit = document.getElementById('applicantUnit').value;
            const appTitle = document.getElementById('applicantTitle').value;
            const appEmail = document.getElementById('applicantEmail').value;
            const appPhone = document.getElementById('applicantPhone').value;

            if (!identity || !piName || !piUnit || !piTitle || !piEmail || !piPhone || !appName || !appUnit || !appTitle || !appEmail || !appPhone) {
                alert('請完整填寫基本資料中的所有必填欄位！');
                return;
            }

            step1.classList.add('d-none');
            stepDetail.classList.remove('d-none');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const backToStep1Btn = document.getElementById('backToStep1Btn');
    if (backToStep1Btn) {
        backToStep1Btn.addEventListener('click', function () {
            stepDetail.classList.add('d-none');
            step1.classList.remove('d-none');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const toStep2Btn = document.getElementById('toStep2Btn');
    if (toStep2Btn) {
        toStep2Btn.addEventListener('click', function () {
            stepDetail.classList.add('d-none');
            step2.classList.remove('d-none');

            const biochemSection = document.getElementById('biochemSection');
            const genomicsSection = document.getElementById('genomicsSection');

            if (selectedCategory === 'biochem') {
                biochemSection.classList.remove('d-none');
                genomicsSection.classList.add('d-none');
            } else if (selectedCategory === 'genomics') {
                genomicsSection.classList.remove('d-none');
                biochemSection.classList.add('d-none');
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const prevBtn = document.getElementById('prevBtn');
    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            step2.classList.add('d-none');
            stepDetail.classList.remove('d-none');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==========================================
    // 3. 第二頁互動功能：同計畫主持人勾選
    // ==========================================
    const sameAsPi = document.getElementById('sameAsPi');
    if (sameAsPi) {
        sameAsPi.addEventListener('change', function () {
            if (this.checked) {
                document.getElementById('applicantName').value = document.getElementById('piName').value;
                document.getElementById('applicantUnit').value = document.getElementById('piUnit').value;
                document.getElementById('applicantTitle').value = document.getElementById('piTitle').value;
                document.getElementById('applicantEmail').value = document.getElementById('piEmail').value;
                document.getElementById('applicantPhone').value = document.getElementById('piPhone').value;
            } else {
                document.getElementById('applicantName').value = '';
                document.getElementById('applicantUnit').value = '';
                document.getElementById('applicantTitle').value = '';
                document.getElementById('applicantEmail').value = '';
                document.getElementById('applicantPhone').value = '';
            }
        });
    }

    // ==========================================
    // 4. 第四頁服務細項連動與動態顯示控制
    // ==========================================
    document.querySelectorAll('.service-check').forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const targetId = this.getAttribute('data-target');
            const container = document.getElementById(targetId + '-container');
            if (this.checked) {
                container.classList.remove('d-none');
            } else {
                container.classList.add('d-none');
            }
        });
    });

    const pcr16sV3V4 = document.getElementById('pcr16s_v3v4');
    const pcr16sFullPacbio = document.getElementById('pcr16s_full_pacbio');
    const pcr16sFullNanopore = document.getElementById('pcr16s_full_nanopore');
    const v3v4Note = document.getElementById('v3v4Note');
    const pacbioNote = document.getElementById('pacbioNote');
    const nanoporeNote = document.getElementById('nanoporeNote');

    const block2Container = document.getElementById('block2-container');
    const block2DownloadBtn = block2Container ? block2Container.querySelector('.download-sample-sheet-btn') : null;
    const sub2 = document.getElementById('sub2');
    const service2Checkbox = document.getElementById('service2');

    const block0Container = document.getElementById('block0-container');
    const block0DownloadBtn = block0Container ? block0Container.querySelector('.download-sample-sheet-btn') : null;

    function update16sNotes() {
        if (!v3v4Note) return;
        v3v4Note.style.display = pcr16sV3V4.checked ? 'block' : 'none';
        pacbioNote.style.display = pcr16sFullPacbio.checked ? 'block' : 'none';
        nanoporeNote.style.display = pcr16sFullNanopore.checked ? 'block' : 'none';

        const isStoolChecked = document.getElementById('includeStoolExtraction')?.checked;

        if (pcr16sFullNanopore.checked) {
            if (service2Checkbox && !service2Checkbox.checked) {
                service2Checkbox.checked = true;
                block2Container.classList.remove('d-none');
            }
            if (sub2) {
                sub2.value = 'Nanopore長片段建庫及定序';
            }

            if (isStoolChecked) {
                if (block2DownloadBtn) block2DownloadBtn.style.display = 'none';
                if (block0DownloadBtn) block0DownloadBtn.style.display = 'none';
            } else {
                if (block0DownloadBtn) block0DownloadBtn.style.display = 'none';
                if (block2DownloadBtn) block2DownloadBtn.style.display = 'block';
            }
        } else {
            if (block0DownloadBtn) block0DownloadBtn.style.display = 'block';
            if (block2DownloadBtn) block2DownloadBtn.style.display = 'block';
        }
    }

    if (pcr16sV3V4) {
        pcr16sV3V4.addEventListener('change', update16sNotes);
        pcr16sFullPacbio.addEventListener('change', update16sNotes);
        pcr16sFullNanopore.addEventListener('change', update16sNotes);
    }

    const sub1 = document.getElementById('sub1');
    const sampleType1 = document.getElementById('sampleType1');
    const block1DownloadContainer = document.getElementById('block1DownloadContainer');
    const qcContainer = document.getElementById('qcContainer');
    
    const dnaNgsBuildingWrapper = document.getElementById('dnaNgsBuildingWrapper');
    const rnaNgsBuildingWrapper = document.getElementById('rnaNgsBuildingWrapper');
    const totalNgsBuildingWrapper = document.getElementById('totalNgsBuildingWrapper');

    const sampleTypeOptions = {
        "DNA 萃取": ["Whole blood (3mL-10mL)", "Whole blood (0.2mL)", "Tissue", "Cell", "FFPE", "Serum/Plasma/Urine (cfDNA)", "Stool"],
        "RNA 萃取": ["Tissue", "Cells", "Cell (miRNA)", "FFPE", "Plasma/Serum", "Plasma/Serum (miRNA)"],
        "Total Nucleic Acid 萃取": ["FFPE"],
        "核酸片段化 (Covaris Shearing)": ["DNA"],
        "DNA/RNA QC (已自行萃取核酸)": ["DNA", "RNA"]
    };

    function updateSampleTypes(selectedSub, targetSampleVal = '') {
        if (!sub1) return;
        sampleType1.innerHTML = '<option value="">請選擇樣品種類</option>';
        if (sampleTypeOptions[selectedSub]) {
            sampleTypeOptions[selectedSub].forEach(item => {
                const opt = document.createElement('option');
                opt.value = item;
                opt.textContent = item;
                if (item === targetSampleVal) {
                    opt.selected = true;
                }
                sampleType1.appendChild(opt);
            });
        }
    }

    function updateNgsOptions(isRna) {
        if (!sub2) return;
        const options = sub2.options;
        for (let i = 0; i < options.length; i++) {
            const val = options[i].value;
            if (isRna) {
                if (val.includes('DNAseq') || val.includes('Nanopore')) {
                    options[i].style.display = 'none';
                    if (sub2.value === val) sub2.value = '';
                } else {
                    options[i].style.display = 'block';
                }
            } else {
                if (val.includes('RNA') || val.includes('mRNA') || val.includes('totalRNA') || val.includes('Targeted')) {
                    options[i].style.display = 'none';
                    if (sub2.value === val) sub2.value = '';
                } else {
                    options[i].style.display = 'block';
                }
            }
        }
    }

    function hideAllNgsWrappers() {
        if (dnaNgsBuildingWrapper) dnaNgsBuildingWrapper.classList.add('d-none');
        if (rnaNgsBuildingWrapper) rnaNgsBuildingWrapper.classList.add('d-none');
        if (totalNgsBuildingWrapper) totalNgsBuildingWrapper.classList.add('d-none');
        
        ['includeDnaNgsBuilding', 'includeRnaNgsBuilding', 'includeTotalDnaNgs', 'includeTotalRnaNgs'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.checked = false;
        });
    }

    if (sub1) {
        sub1.addEventListener('change', function () {
            const val = this.value;
            updateSampleTypes(val);
            if (qcContainer) qcContainer.classList.remove('d-none');
            hideAllNgsWrappers();

            if (val === 'DNA 萃取') {
                if (dnaNgsBuildingWrapper) dnaNgsBuildingWrapper.classList.remove('d-none');
                updateNgsOptions(false);
            } else if (val === 'DNA/RNA QC (已自行萃取核酸)') {
                const sampleVal = sampleType1.value;
                if (sampleVal === 'RNA') {
                    if (rnaNgsBuildingWrapper) rnaNgsBuildingWrapper.classList.remove('d-none');
                    updateNgsOptions(true);
                } else {
                    if (dnaNgsBuildingWrapper) dnaNgsBuildingWrapper.classList.remove('d-none');
                    updateNgsOptions(false);
                }
            } else if (val.includes('RNA')) {
                if (rnaNgsBuildingWrapper) rnaNgsBuildingWrapper.classList.remove('d-none');
                updateNgsOptions(true);
            } else if (val === 'Total Nucleic Acid 萃取') {
                if (totalNgsBuildingWrapper) totalNgsBuildingWrapper.classList.remove('d-none');
                updateNgsOptions(true);
            } else if (val === '核酸片段化 (Covaris Shearing)') {
                if (dnaNgsBuildingWrapper) dnaNgsBuildingWrapper.classList.remove('d-none');
                updateNgsOptions(false);
            }
        });
    }

    if (sampleType1) {
        sampleType1.addEventListener('change', function () {
            const sampleVal = this.value;
            const val = sub1.value;

            if (sampleVal === 'Stool') {
                if (qcContainer) qcContainer.classList.add('d-none');
                hideAllNgsWrappers();
            } else {
                if (qcContainer) qcContainer.classList.remove('d-none');
                
                if (val === 'DNA/RNA QC (已自行萃取核酸)') {
                    hideAllNgsWrappers();
                    if (sampleVal === 'RNA') {
                        if (rnaNgsBuildingWrapper) rnaNgsBuildingWrapper.classList.remove('d-none');
                        updateNgsOptions(true);
                    } else {
                        if (dnaNgsBuildingWrapper) dnaNgsBuildingWrapper.classList.remove('d-none');
                        updateNgsOptions(false);
                    }
                } else if (val === 'DNA 萃取' || val === '核酸片段化 (Covaris Shearing)') {
                    if (dnaNgsBuildingWrapper) dnaNgsBuildingWrapper.classList.remove('d-none');
                } else if (val && val.includes('RNA')) {
                    if (rnaNgsBuildingWrapper) rnaNgsBuildingWrapper.classList.remove('d-none');
                } else if (val === 'Total Nucleic Acid 萃取') {
                    if (totalNgsBuildingWrapper) totalNgsBuildingWrapper.classList.remove('d-none');
                }
            }
        });
    }

    const includeDnaNgsBuilding = document.getElementById('includeDnaNgsBuilding');
    const includeRnaNgsBuilding = document.getElementById('includeRnaNgsBuilding');
    const includeTotalDnaNgs = document.getElementById('includeTotalDnaNgs');
    const includeTotalRnaNgs = document.getElementById('includeTotalRnaNgs');

    if (includeDnaNgsBuilding) {
        includeDnaNgsBuilding.addEventListener('change', function() {
            if (this.checked) {
                if (includeRnaNgsBuilding) includeRnaNgsBuilding.checked = false;
                updateNgsOptions(false);
            }
            checkNgsBuildingStatus();
        });
    }

    if (includeRnaNgsBuilding) {
        includeRnaNgsBuilding.addEventListener('change', function() {
            if (this.checked) {
                if (includeDnaNgsBuilding) includeDnaNgsBuilding.checked = false;
                updateNgsOptions(true);
            }
            checkNgsBuildingStatus();
        });
    }

    if (includeTotalDnaNgs) {
        includeTotalDnaNgs.addEventListener('change', function() {
            if (this.checked) {
                if (includeTotalRnaNgs) includeTotalRnaNgs.checked = false;
                updateNgsOptions(false);
            }
            checkNgsBuildingStatus();
        });
    }

    if (includeTotalRnaNgs) {
        includeTotalRnaNgs.addEventListener('change', function() {
            if (this.checked) {
                if (includeTotalDnaNgs) includeTotalDnaNgs.checked = false;
                updateNgsOptions(true);
            }
            checkNgsBuildingStatus();
        });
    }

    function checkNgsBuildingStatus() {
        const isNgsChecked = (includeDnaNgsBuilding && includeDnaNgsBuilding.checked) || 
                             (includeRnaNgsBuilding && includeRnaNgsBuilding.checked) ||
                             (includeTotalDnaNgs && includeTotalDnaNgs.checked) ||
                             (includeTotalRnaNgs && includeTotalRnaNgs.checked);

        if (isNgsChecked) {
            if (service2Checkbox) {
                service2Checkbox.checked = true;
                block2Container.classList.remove('d-none');
            }
            if (block1DownloadContainer) {
                block1DownloadContainer.classList.add('d-none');
            }
        } else {
            if (service2Checkbox) {
                if (!pcr16sFullNanopore?.checked) {
                    service2Checkbox.checked = false;
                    block2Container.classList.add('d-none');
                }
            }
            const isStoolChecked = document.getElementById('includeStoolExtraction')?.checked;
            if (!isStoolChecked && block1DownloadContainer) {
                block1DownloadContainer.classList.remove('d-none');
            }
        }
    }

    const includeStoolExtraction = document.getElementById('includeStoolExtraction');
    const service1Checkbox = document.getElementById('service1');
    const block1Container = document.getElementById('block1-container');

    function checkStoolStatus() {
        if (includeStoolExtraction && includeStoolExtraction.checked) {
            if (service1Checkbox && !service1Checkbox.checked) {
                service1Checkbox.checked = true;
                block1Container.classList.remove('d-none');
            }
            if (sub1) {
                sub1.value = 'DNA 萃取';
                updateSampleTypes('DNA 萃取', 'Stool');
                updateNgsOptions(false);
            }
            if (qcContainer) qcContainer.classList.add('d-none');
            hideAllNgsWrappers();

            if (pcr16sFullNanopore && pcr16sFullNanopore.checked) {
                if (block2DownloadBtn) block2DownloadBtn.style.display = 'none';
            }

            if (block0DownloadBtn) block0DownloadBtn.style.display = 'none';
            if (block1DownloadContainer) block1DownloadContainer.classList.remove('d-none');
        } else {
            update16sNotes();
            if (qcContainer) qcContainer.classList.remove('d-none');
            const val = sub1.value;
            if (val === 'DNA 萃取') {
                if (dnaNgsBuildingWrapper) dnaNgsBuildingWrapper.classList.remove('d-none');
            } else if (val === 'DNA/RNA QC (已自行萃取核酸)') {
                if (sampleType1.value === 'RNA') {
                    if (rnaNgsBuildingWrapper) rnaNgsBuildingWrapper.classList.remove('d-none');
                } else {
                    if (dnaNgsBuildingWrapper) dnaNgsBuildingWrapper.classList.remove('d-none');
                }
            } else if (val && val.includes('RNA')) {
                if (rnaNgsBuildingWrapper) rnaNgsBuildingWrapper.classList.remove('d-none');
            } else if (val === 'Total Nucleic Acid 萃取') {
                if (totalNgsBuildingWrapper) totalNgsBuildingWrapper.classList.remove('d-none');
            }
            
            const isNgsChecked = (includeDnaNgsBuilding?.checked || includeRnaNgsBuilding?.checked || includeTotalDnaNgs?.checked || includeTotalRnaNgs?.checked);
            if (!isNgsChecked && block1DownloadContainer) {
                block1DownloadContainer.classList.remove('d-none');
            }
        }
    }

    if (includeStoolExtraction) {
        includeStoolExtraction.addEventListener('change', checkStoolStatus);
    }

    // ==========================================
    // 第四項 Single Cell 專屬連動邏輯
    // ==========================================
    const sub3Category = document.getElementById('sub3Category');
    const universalKitContainer = document.getElementById('universalKitContainer');
    const fixedKitContainer = document.getElementById('fixedKitContainer');
    const universalKitSub = document.getElementById('universalKitSub');
    const fixedKitSub = document.getElementById('fixedKitSub');
    const bcrTcrContainer = document.getElementById('bcrTcrContainer');

    if (sub3Category) {
        sub3Category.addEventListener('change', function() {
            const val = this.value;
            if (val === 'Universal') {
                universalKitContainer.classList.remove('d-none');
                fixedKitContainer.classList.add('d-none');
                if (fixedKitSub) fixedKitSub.value = '';
                bcrTcrContainer.classList.add('d-none');
                document.getElementById('checkBcr').checked = false;
                document.getElementById('checkTcr').checked = false;
            } else if (val === 'Fixed RNA Profiling') {
                fixedKitContainer.classList.remove('d-none');
                universalKitContainer.classList.add('d-none');
                if (universalKitSub) universalKitSub.value = '';
                bcrTcrContainer.classList.add('d-none');
                document.getElementById('checkBcr').checked = false;
                document.getElementById('checkTcr').checked = false;
            } else {
                universalKitContainer.classList.add('d-none');
                fixedKitContainer.classList.add('d-none');
                bcrTcrContainer.classList.add('d-none');
            }
        });
    }

    if (universalKitSub) {
        universalKitSub.addEventListener('change', function() {
            const kitVal = this.value;
            if (kitVal && kitVal.includes("5'")) {
                bcrTcrContainer.classList.remove('d-none');
            } else {
                bcrTcrContainer.classList.add('d-none');
                document.getElementById('checkBcr').checked = false;
                document.getElementById('checkTcr').checked = false;
            }
        });
    }

    // ==========================================
    // 第五項 Spatial Transcriptomics 專屬連動邏輯
    // ==========================================
    const sub4Category = document.getElementById('sub4Category');
    const visiumSubContainer = document.getElementById('visiumSubContainer');
    const xeniumSubContainer = document.getElementById('xeniumSubContainer');
    const visiumSub = document.getElementById('visiumSub');
    const xeniumSub = document.getElementById('xeniumSub');

    if (sub4Category) {
        sub4Category.addEventListener('change', function() {
            const val = this.value;
            if (val === 'Visium') {
                visiumSubContainer.classList.remove('d-none');
                xeniumSubContainer.classList.add('d-none');
                if (xeniumSub) xeniumSub.value = '';
            } else if (val === 'Xenium') {
                xeniumSubContainer.classList.remove('d-none');
                visiumSubContainer.classList.add('d-none');
                if (visiumSub) visiumSub.value = '';
            } else {
                visiumSubContainer.classList.add('d-none');
                xeniumSubContainer.classList.add('d-none');
            }
        });
    }

    // ==========================================
    // 5. 檢體清單動態生成 (預設 6 筆表格)
    // ==========================================
    const sampleTableBody = document.getElementById('sampleTableBody');
    if (sampleTableBody) {
        for (let i = 1; i <= 6; i++) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="text-center align-middle" style="height: 32px;">${i}</td>
                <td></td>
                <td></td>
            `;
            sampleTableBody.appendChild(tr);
        }
    }

    // ==========================================
    // 6. 下載檢體送件單：動態帶入勾選細項與自適應表格欄位
    // ==========================================
    document.querySelectorAll('.download-sample-sheet-btn').forEach(button => {
        button.addEventListener('click', function () {
            const blockIndex = this.getAttribute('data-block');

            if (blockIndex === '1') {
                const isNgsChecked = (includeDnaNgsBuilding?.checked || includeRnaNgsBuilding?.checked || includeTotalDnaNgs?.checked || includeTotalRnaNgs?.checked);
                if (isNgsChecked) {
                    alert('您已勾選 NGS 建庫，請至第三大項下載完整的檢體送件單！');
                    return;
                }
            }

            const appNameInput = document.getElementById('applicantName').value;
            const appPhoneInput = document.getElementById('applicantPhone').value;
            const appEmailInput = document.getElementById('applicantEmail').value;
            
            const lblName = document.getElementById('lblApplicantName');
            const lblPhone = document.getElementById('lblApplicantPhone');
            const lblDate = document.getElementById('lblDate');
            const lblMainCategory = document.getElementById('lblMainCategory');
            const lblServiceDetails = document.getElementById('lblServiceDetails');
            const lblApplicantEmail = document.getElementById('lblApplicantEmail');

            if (lblName) lblName.textContent = appNameInput || '';
            if (lblPhone) lblPhone.textContent = appPhoneInput || '';
            if (lblApplicantEmail) lblApplicantEmail.textContent = appEmailInput || '';
            if (lblDate) {
                const today = new Date();
                lblDate.textContent = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
            }

            let mainTitle = '';
            let detailsText = [];
            let isDnaExtraction = false;
            let isRnaExtraction = false;
            let isSingleCell = false;
            let isVisium = false;
            let isXenium = false;

            if (blockIndex === '0') {
                mainTitle = '一、16S PCR';
                if (document.getElementById('pcr16s_v3v4').checked) {
                    detailsText.push('16S V3-V4 (定序在醫學院第一共研)');
                } else if (document.getElementById('pcr16s_full_pacbio').checked) {
                    detailsText.push('Full Length 醫學院第一共研 PacBio');
                } else if (document.getElementById('pcr16s_full_nanopore').checked) {
                    detailsText.push('Full Length 醫研部定序核心 Nanopore');
                }
            } else if (blockIndex === '1') {
                mainTitle = '二、核酸萃取/樣本品管/核酸片段化';
                const sub1Val = document.getElementById('sub1').value;
                const sampleTypeVal = document.getElementById('sampleType1').value;
                if (sub1Val) detailsText.push(`服務項目: ${sub1Val}`);
                if (sampleTypeVal) detailsText.push(`樣品種類: ${sampleTypeVal}`);
                
                const isStoolChecked = document.getElementById('includeStoolExtraction')?.checked;
                const is16sChecked = document.getElementById('service0')?.checked;
                if (isStoolChecked && is16sChecked && sampleTypeVal === 'Stool') {
                    let pcrTypeText = '';
                    if (document.getElementById('pcr16s_v3v4').checked) {
                        pcrTypeText = '16S V3-V4 (定序在醫學院第一共研)';
                    } else if (document.getElementById('pcr16s_full_pacbio').checked) {
                        pcrTypeText = 'Full Length 醫學院第一共研 PacBio';
                    } else if (document.getElementById('pcr16s_full_nanopore').checked) {
                        pcrTypeText = 'Full Length 醫研部定序核心 Nanopore';
                    }
                    if (pcrTypeText) {
                        detailsText.push(`搭配 16S PCR: ${pcrTypeText}`);
                    }
                }

                const sub2Val = document.getElementById('sub2')?.value;
                const service2Checked = document.getElementById('service2')?.checked;
                if (service2Checked && sub2Val === 'Nanopore長片段建庫及定序') {
                    detailsText.push(`搭配建庫: ${sub2Val}`);
                }

                if (sub1Val === 'DNA 萃取' || sub1Val === 'DNA/RNA QC (已自行萃取核酸)') {
                    isDnaExtraction = true;
                } else if (sub1Val && sub1Val.includes('RNA')) {
                    isRnaExtraction = true;
                }
            } else if (blockIndex === '2') {
                mainTitle = '三、NGS高通量定序建庫';
                const sub2Val = document.getElementById('sub2').value;
                if (sub2Val) detailsText.push(`建庫項目: ${sub2Val}`);
                if (document.getElementById('pcr16s_full_nanopore')?.checked) {
                    detailsText.push('搭配 16S PCR: Full Length 醫研部定序核心 Nanopore');
                }
            } else if (blockIndex === '3') {
                mainTitle = '四、Single Cell Transcriptomics';
                isSingleCell = true;
                const sub3Cat = document.getElementById('sub3Category').value;
                if (sub3Cat) detailsText.push(`平台: ${sub3Cat}`);
                if (sub3Cat === 'Universal') {
                    const kit = document.getElementById('universalKitSub').value;
                    if (kit) detailsText.push(`Kit規格: ${kit}`);
                    if (document.getElementById('checkBcr').checked) detailsText.push('加做 BCR');
                    if (document.getElementById('checkTcr').checked) detailsText.push('加做 TCR');
                } else if (sub3Cat === 'Fixed RNA Profiling') {
                    const fixKit = document.getElementById('fixedKitSub').value;
                    if (fixKit) detailsText.push(`規格: ${fixKit}`);
                }
            } else if (blockIndex === '4') {
                mainTitle = '五、Spatial Transcriptomics 空間體學';
                const sub4Cat = document.getElementById('sub4Category').value;
                if (sub4Cat) detailsText.push(`平台: ${sub4Cat}`);
                if (sub4Cat === 'Visium') {
                    isVisium = true;
                    const vSub = document.getElementById('visiumSub').value;
                    if (vSub) detailsText.push(`規格: ${vSub}`);
                } else if (sub4Cat === 'Xenium') {
                    isXenium = true;
                    const xSub = document.getElementById('xeniumSub').value;
                    if (xSub) detailsText.push(`規格: ${xSub}`);
                }
            } else if (blockIndex === 'biochem') {
                mainTitle = '🔬 生化服務項目';
                const biochemSub = document.getElementById('biochemSub').value;
                if (biochemSub) detailsText.push(`細項選擇: ${biochemSub}`);
            }

            if (lblMainCategory) lblMainCategory.textContent = mainTitle;
            if (lblServiceDetails) {
                lblServiceDetails.textContent = detailsText.length > 0 ? detailsText.join('\n') : '（未勾選特定細項）';
            }

            const sampleTableHeader = document.getElementById('sampleTableHeader');
            const sampleTableBody = document.getElementById('sampleTableBody');
            const sampleTableTitle = document.getElementById('sampleTableTitle');
            const sampleNoticeText = document.getElementById('sampleNoticeText');
            sampleTableBody.innerHTML = '';

            if (isVisium) {
                if (sampleTableTitle) sampleTableTitle.textContent = '🧬 檢體清單明細 (共 6 筆)';
                if (sampleNoticeText) sampleNoticeText.innerHTML = '<em>* 超過 6 個樣本請另外填寫一張單子。（本表由核心人員填寫核心編號）</em>';
                sampleTableHeader.innerHTML = `
                    <tr>
                        <th style="width: 15%;">序號</th>
                        <th style="width: 25%;">核心編號 (核心填寫)</th>
                        <th style="width: 60%;">樣品名稱</th>
                    </tr>
                `;
                for (let i = 1; i <= 6; i++) {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td class="text-center align-middle" style="height: 32px;">${i}</td>
                        <td></td>
                        <td></td>
                    `;
                    sampleTableBody.appendChild(tr);
                }
            } else if (isXenium) {
                if (sampleTableTitle) sampleTableTitle.textContent = '🧬 檢體清單明細 (共 8 筆)';
                if (sampleNoticeText) sampleNoticeText.innerHTML = '<em>* 超過 8 個樣本請另外填寫一張單子。（本表由核心人員填寫核心編號）</em>';
                sampleTableHeader.innerHTML = `
                    <tr>
                        <th style="width: 15%;">序號</th>
                        <th style="width: 25%;">核心編號 (核心填寫)</th>
                        <th style="width: 60%;">樣品名稱</th>
                    </tr>
                `;
                for (let i = 1; i <= 8; i++) {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td class="text-center align-middle" style="height: 32px;">${i}</td>
                        <td></td>
                        <td></td>
                    `;
                    sampleTableBody.appendChild(tr);
                }
            } else if (isSingleCell) {
                if (sampleTableTitle) sampleTableTitle.textContent = '🧬 檢體清單明細 (共 6 筆)';
                if (sampleNoticeText) sampleNoticeText.innerHTML = '<em>* 超過 6 個樣本請另外填寫一張單子。（本表由核心人員填寫核心編號）</em>';
                sampleTableHeader.innerHTML = `
                    <tr>
                        <th style="width: 7%;">序號</th>
                        <th style="width: 20%;">核心編號 (核心填寫)</th>
                        <th style="width: 25%;">樣品名稱</th>
                        <th style="width: 48%;">細胞數或細胞核數及 viability (%)</th>
                    </tr>
                `;
                for (let i = 1; i <= 6; i++) {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td class="text-center align-middle" style="height: 32px;">${i}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    `;
                    sampleTableBody.appendChild(tr);
                }
            } else if (isDnaExtraction) {
                if (sampleTableTitle) sampleTableTitle.textContent = '🧬 檢體清單明細 (共 6 筆)';
                if (sampleNoticeText) sampleNoticeText.innerHTML = '<em>* 超過 6 個樣本請另外填寫一張單子。（本表由核心人員填寫核心編號）</em>';
                sampleTableHeader.innerHTML = `
                    <tr>
                        <th style="width: 8%;">序號</th>
                        <th style="width: 25%;">核心編號 (核心填寫)</th>
                        <th style="width: 27%;">樣品名稱</th>
                        <th style="width: 20%;">Qubit 濃度 (ng/uL)</th>
                        <th style="width: 20%;">體積 (uL)</th>
                    </tr>
                `;
                for (let i = 1; i <= 6; i++) {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td class="text-center align-middle" style="height: 32px;">${i}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    `;
                    sampleTableBody.appendChild(tr);
                }
            } else if (isRnaExtraction) {
                if (sampleTableTitle) sampleTableTitle.textContent = '🧬 檢體清單明細 (共 6 筆)';
                if (sampleNoticeText) sampleNoticeText.innerHTML = '<em>* 超過 6 個樣本請另外填寫一張單子。（本表由核心人員填寫核心編號）</em>';
                sampleTableHeader.innerHTML = `
                    <tr>
                        <th style="width: 8%;">序號</th>
                        <th style="width: 25%;">核心編號 (核心填寫)</th>
                        <th style="width: 27%;">樣品名稱</th>
                        <th style="width: 13%;">濃度 (ng/uL)</th>
                        <th style="width: 13%;">DV200</th>
                        <th style="width: 14%;">RQN</th>
                    </tr>
                `;
                for (let i = 1; i <= 6; i++) {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td class="text-center align-middle" style="height: 32px;">${i}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    `;
                    sampleTableBody.appendChild(tr);
                }
            } else {
                if (sampleTableTitle) sampleTableTitle.textContent = '🧬 檢體清單明細 (共 6 筆)';
                if (sampleNoticeText) sampleNoticeText.innerHTML = '<em>* 超過 6 個樣本請另外填寫一張單子。（本表由核心人員填寫核心編號）</em>';
                sampleTableHeader.innerHTML = `
                    <tr>
                        <th style="width: 10%;">序號</th>
                        <th style="width: 30%;">核心編號 (核心填寫)</th>
                        <th style="width: 35%;">樣品名稱</th>
                        <th style="width: 25%;">Qubit 濃度 (ng/uL)</th>
                    </tr>
                `;
                for (let i = 1; i <= 6; i++) {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td class="text-center align-middle" style="height: 32px;">${i}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    `;
                    sampleTableBody.appendChild(tr);
                }
            }

            const printSectionHtml = document.getElementById('printSection').innerHTML;

            const fullHtml = `
                <!DOCTYPE html>
                <html lang="zh-Hant">
                <head>
                    <meta charset="UTF-8">
                    <title>檢體送件單預覽</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
                    <style>
                        body { background-color: #fff; padding: 20px; }
                        .preview-toolbar {
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100%;
                            background: #f8f9fa;
                            border-bottom: 1px solid #dee2e6;
                            padding: 10px 20px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                            z-index: 1000;
                        }
                        .preview-content {
                            margin-top: 70px;
                        }
                        @media print {
                            .preview-toolbar { display: none; }
                            .preview-content { margin-top: 0; }
                        }
                    </style>
                </head>
                <body>
                    <div class="preview-toolbar">
                        <span class="fw-bold text-secondary">📄 檢體送件單預覽畫面</span>
                        <div>
                            <button onclick="window.print()" class="btn btn-primary btn-sm fw-bold me-2">🖨️ 列印此單子</button>
                            <button onclick="window.close()" class="btn btn-secondary btn-sm">關閉頁面</button>
                        </div>
                    </div>
                    <div class="container preview-content">
                        ${printSectionHtml}
                    </div>
                </body>
                </html>
            `;

            const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
        });
    });

    // ==========================================
    // 7. 表單最後確認送出與 Google Sheets 串接 (透過隱藏 Form/Iframe 送出)
    // ==========================================
    const multiStepForm = document.getElementById('multiStepForm');
    if (multiStepForm) {
        multiStepForm.addEventListener('submit', function (e) {
            e.preventDefault();

            let mainCategoryText = '';
            let detailsTextList = [];
            let hasError = false;
            let errorMessage = '';

            if (selectedCategory === 'genomics') {
                const service0Checked = document.getElementById('service0')?.checked;
                if (service0Checked) {
                    mainCategoryText += '16S PCR; ';
                    let pcrSubText = '';
                    if (document.getElementById('pcr16s_v3v4')?.checked) {
                        pcrSubText = '16S V3-V4';
                    } else if (document.getElementById('pcr16s_full_pacbio')?.checked) {
                        pcrSubText = 'Full Length PacBio';
                    } else if (document.getElementById('pcr16s_full_nanopore')?.checked) {
                        pcrSubText = 'Full Length Nanopore';
                    }
                    if (pcrSubText) {
                        detailsTextList.push(`16S細項: ${pcrSubText}`);
                    }
                }

                const service1Checked = document.getElementById('service1')?.checked;
                if (service1Checked) {
                    const sub1 = document.getElementById('sub1')?.value;
                    const sampleType = document.getElementById('sampleType1')?.value;
                    
                    if (!sub1) {
                        hasError = true;
                        errorMessage = '⚠️ 您勾選了「核酸萃取/樣本品管/核酸片段化」，請選擇其「服務項目」！';
                    } else if (!sampleType) {
                        hasError = true;
                        errorMessage = '⚠️ 您選擇了核酸萃取服務，請選擇對應的「樣品種類 (Sample Type)」！';
                    } else {
                        mainCategoryText += '核酸萃取/樣本品管/核酸片段化; ';
                        detailsTextList.push(`項目: ${sub1}`);
                        detailsTextList.push(`樣品: ${sampleType}`);
                    }
                }

                const service2Checked = document.getElementById('service2')?.checked;
                if (service2Checked) {
                    const sub2 = document.getElementById('sub2')?.value;
                    if (!sub2) {
                        hasError = true;
                        errorMessage = '⚠️ 您勾選了「NGS高通量定序建庫」，請選擇對應的「建庫項目」！';
                    } else {
                        mainCategoryText += 'NGS高通量定序建庫; ';
                        detailsTextList.push(`建庫: ${sub2}`);
                    }
                }

                const service3Checked = document.getElementById('service3')?.checked;
                if (service3Checked) {
                    const sub3 = document.getElementById('sub3Category')?.value;
                    if (!sub3) {
                        hasError = true;
                        errorMessage = '⚠️ 您勾選了「Single Cell Transcriptomics」，請選擇對應的「平台」！';
                    } else {
                        mainCategoryText += 'Single Cell Transcriptomics; ';
                        detailsTextList.push(`平台: ${sub3}`);
                    }
                }

                const service4Checked = document.getElementById('service4')?.checked;
                if (service4Checked) {
                    const sub4 = document.getElementById('sub4Category')?.value;
                    if (!sub4) {
                        hasError = true;
                        errorMessage = '⚠️ 您勾選了「Spatial Transcriptomics 空間體學」，請選擇對應的平台！';
                    } else {
                        mainCategoryText += 'Spatial Transcriptomics 空間體學; ';
                        detailsTextList.push(`平台: ${sub4}`);
                    }
                }
            }

            if (!mainCategoryText.trim()) {
                alert('⚠️ 請至少勾選一項核心服務項目！');
                return;
            }

            if (hasError) {
                alert(errorMessage);
                return;
            }

            const formDataObj = {
                identity: document.getElementById('applicantIdentity')?.value || '',
                piName: document.getElementById('piName')?.value || '',
                piUnit: document.getElementById('piUnit')?.value || '',
                piEmail: document.getElementById('piEmail')?.value || '',
                appName: document.getElementById('applicantName')?.value || '',
                appPhone: document.getElementById('applicantPhone')?.value || '',
                appEmail: document.getElementById('applicantEmail')?.value || '',
                mainCategory: mainCategoryText,
                serviceDetails: detailsTextList.join('\n'),
                contactName: document.getElementById('contactName')?.value || '',
                contactUnit: document.getElementById('contactUnit')?.value || '',
                contactTitle: document.getElementById('contactTitle')?.value || '',
                contactEmail: document.getElementById('contactEmail')?.value || '',
                contactPhone: document.getElementById('contactPhone')?.value || ''
            };

            const submitBtn = document.getElementById('submitBtn');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = '資料傳送中...';
            }

            const scriptURL = 'https://script.google.com/macros/s/AKfycbwt2GH8qnFzxfsrGaoWseQGlgGZydCG1h30sn762S7VsFVyawJhN0qTY1bZMfG3NrU5/exec';

            // 建立隱藏的 Form 透過 iframe 送出，完美避開 CORS 與重新導向問題
            const iframeName = 'hidden_iframe_' + Date.now();
            const iframe = document.createElement('iframe');
            iframe.name = iframeName;
            iframe.style.display = 'none';
            document.body.appendChild(iframe);

            const form = document.createElement('form');
            form.method = 'POST';
            form.action = scriptURL;
            form.target = iframeName;

            // 將資料包裝進隱藏欄位
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'data';
            input.value = JSON.stringify(formDataObj);
            form.appendChild(input);

            document.body.appendChild(form);
            form.submit();

            // 稍微延遲後顯示成功畫面並清理 DOM
            setTimeout(() => {
                var successModal = new bootstrap.Modal(document.getElementById('successModal'));
                successModal.show();
                form.remove();
                iframe.remove();
            }, 1000);
        });
    }

    // ==========================================
    // 8. 快速填入測試資料功能
    // ==========================================
    const quickTestBtn = document.getElementById('quickTestBtn');
    if (quickTestBtn) {
        quickTestBtn.addEventListener('click', function () {
            document.getElementById('applicantIdentity').value = "台大醫院/醫學院/公衛學院";
            document.getElementById('piName').value = "王大明";
            document.getElementById('piUnit').value = "內科部";
            document.getElementById('piTitle').value = "教授";
            document.getElementById('piEmail').value = "test@ntu.edu.tw";
            document.getElementById('piPhone').value = "0912345678";
            
            document.getElementById('sameAsPi').checked = true;
            document.getElementById('applicantName').value = "王大明";
            document.getElementById('applicantUnit').value = "內科部";
            document.getElementById('applicantTitle').value = "教授";
            document.getElementById('applicantEmail').value = "test@ntu.edu.tw";
            document.getElementById('applicantPhone').value = "0912345678";
            
            alert('已快速填入測試資料！');
        });
    }
});
