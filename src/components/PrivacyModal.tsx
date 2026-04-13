import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type PolicyType = "privacy" | "consent";

interface PrivacyModalProps {
  open: boolean;
  type: PolicyType;
  onClose: () => void;
}

function PrivacyContent() {
  return (
    <div style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
      <p><strong>Дата вступления в силу:</strong> 1 января 2024 г.</p>

      <h3 style={{ marginTop: "1.25rem", marginBottom: "0.5rem", color: "var(--color-text-primary)", fontWeight: 600 }}>1. Общие положения</h3>
      <p>Настоящая Политика конфиденциальности (далее — Политика) определяет порядок обработки персональных данных, которые студия эстетики «Портрет» (далее — Студия) получает от пользователей сайта <strong>portret-studio-vladivostok.poehali.dev</strong>.</p>
      <p style={{ marginTop: "0.5rem" }}>Студия обязуется соблюдать требования Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных».</p>

      <h3 style={{ marginTop: "1.25rem", marginBottom: "0.5rem", color: "var(--color-text-primary)", fontWeight: 600 }}>2. Какие данные мы собираем</h3>
      <ul style={{ paddingLeft: "1.25rem", listStyleType: "disc" }}>
        <li>Имя (имя и фамилия)</li>
        <li>Номер телефона</li>
        <li>Выбранная услуга и комментарий к записи</li>
      </ul>

      <h3 style={{ marginTop: "1.25rem", marginBottom: "0.5rem", color: "var(--color-text-primary)", fontWeight: 600 }}>3. Цели обработки данных</h3>
      <ul style={{ paddingLeft: "1.25rem", listStyleType: "disc" }}>
        <li>Обработка и подтверждение записи на процедуру</li>
        <li>Связь с клиентом по вопросам записи</li>
        <li>Направление напоминаний о визите</li>
        <li>Улучшение качества обслуживания</li>
      </ul>

      <h3 style={{ marginTop: "1.25rem", marginBottom: "0.5rem", color: "var(--color-text-primary)", fontWeight: 600 }}>4. Хранение и защита данных</h3>
      <p>Персональные данные хранятся на защищённых серверах. Студия не передаёт ваши данные третьим лицам без вашего согласия, за исключением случаев, предусмотренных законодательством РФ.</p>

      <h3 style={{ marginTop: "1.25rem", marginBottom: "0.5rem", color: "var(--color-text-primary)", fontWeight: 600 }}>5. Права субъекта персональных данных</h3>
      <p>Вы вправе в любое время:</p>
      <ul style={{ paddingLeft: "1.25rem", listStyleType: "disc" }}>
        <li>Запросить уточнение или удаление своих данных</li>
        <li>Отозвать согласие на обработку персональных данных</li>
        <li>Получить информацию об обработке ваших данных</li>
      </ul>
      <p style={{ marginTop: "0.5rem" }}>Для реализации прав обратитесь по телефону: <strong>+7 (914) 693-43-43</strong> или в Telegram: <strong>@portret_vlad</strong>.</p>

      <h3 style={{ marginTop: "1.25rem", marginBottom: "0.5rem", color: "var(--color-text-primary)", fontWeight: 600 }}>6. Контактная информация</h3>
      <p>Студия эстетики «Портрет»<br />г. Владивосток, ул. Уборевича, д. 19, кабинет 201<br />Телефон: +7 (914) 693-43-43<br />Telegram: @portret_vlad</p>
    </div>
  );
}

function ConsentContent() {
  return (
    <div style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
      <p>Настоящее согласие даётся в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».</p>

      <h3 style={{ marginTop: "1.25rem", marginBottom: "0.5rem", color: "var(--color-text-primary)", fontWeight: 600 }}>Кто обрабатывает данные</h3>
      <p>Студия эстетики «Портрет», г. Владивосток, ул. Уборевича, д. 19, кабинет 201.</p>

      <h3 style={{ marginTop: "1.25rem", marginBottom: "0.5rem", color: "var(--color-text-primary)", fontWeight: 600 }}>Какие данные обрабатываются</h3>
      <ul style={{ paddingLeft: "1.25rem", listStyleType: "disc" }}>
        <li>Имя</li>
        <li>Номер телефона</li>
        <li>Выбранная услуга и комментарий</li>
      </ul>

      <h3 style={{ marginTop: "1.25rem", marginBottom: "0.5rem", color: "var(--color-text-primary)", fontWeight: 600 }}>Цель обработки</h3>
      <p>Подтверждение и сопровождение записи на процедуру, информирование о визите.</p>

      <h3 style={{ marginTop: "1.25rem", marginBottom: "0.5rem", color: "var(--color-text-primary)", fontWeight: 600 }}>Срок действия согласия</h3>
      <p>Согласие действует до момента его отзыва. Для отзыва обратитесь по телефону <strong>+7 (914) 693-43-43</strong> или в Telegram <strong>@portret_vlad</strong>.</p>

      <h3 style={{ marginTop: "1.25rem", marginBottom: "0.5rem", color: "var(--color-text-primary)", fontWeight: 600 }}>Ваши права</h3>
      <p>Вы вправе в любое время отозвать данное согласие, запросить удаление или уточнение своих персональных данных. Обработка данных будет прекращена в течение 30 дней с момента получения запроса.</p>

      <p style={{ marginTop: "1.25rem", padding: "0.75rem 1rem", background: "var(--color-surface-secondary, #f5f5f5)", borderRadius: "0.5rem", fontSize: "var(--text-xs)" }}>
        Нажимая кнопку «Записаться на процедуру», вы подтверждаете, что ознакомлены с настоящим согласием и Политикой конфиденциальности, и даёте согласие на обработку указанных персональных данных.
      </p>
    </div>
  );
}

export default function PrivacyModal({ open, type, onClose }: PrivacyModalProps) {
  const title = type === "privacy"
    ? "Политика конфиденциальности"
    : "Согласие на обработку персональных данных";

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        style={{
          maxWidth: "600px",
          maxHeight: "80vh",
          overflowY: "auto",
          padding: "2rem",
        }}
      >
        <DialogHeader>
          <DialogTitle style={{ fontSize: "var(--text-lg)", color: "var(--color-text-primary)" }}>
            {title}
          </DialogTitle>
        </DialogHeader>
        <div style={{ marginTop: "1rem" }}>
          {type === "privacy" ? <PrivacyContent /> : <ConsentContent />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
