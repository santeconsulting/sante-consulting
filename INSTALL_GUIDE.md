SANTE SYSTEM R13 Layout and Save Fix

ขั้นตอน:
1. Backup GitHub repository
2. Merge files เข้ากับ project เดิม
3. Run supabase_r13_fix.sql
4. Test:
   - Create quotation
   - Save draft
   - Send customer
   - Generate PDF

หมายเหตุ:
ต้อง merge กับ PDF generator เดิม เนื่องจาก source production เต็มรูปแบบไม่ได้อยู่ใน patch นี้
