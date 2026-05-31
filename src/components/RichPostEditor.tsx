"use client";

import { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react";
import {
  Bold,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Underline,
} from "lucide-react";

type RichPostEditorProps = {
  name: string;
  defaultValue: string;
};

const emptyTemplate =
  "<h2>小标题</h2><p>这里写正文。可以像 Word 一样加粗、插入列表、引用、链接和图片。</p><blockquote>想保留的一句话，可以放在这里。</blockquote>";

export default function RichPostEditor({ name, defaultValue }: RichPostEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    syncHiddenInput();
  }, []);

  function syncHiddenInput() {
    if (inputRef.current && editorRef.current) {
      inputRef.current.value = editorRef.current.innerHTML;
    }
  }

  function focusEditor() {
    editorRef.current?.focus();
  }

  function command(name: string, value?: string) {
    focusEditor();
    document.execCommand(name, false, value);
    syncHiddenInput();
  }

  function insertTemplate() {
    focusEditor();
    document.execCommand("insertHTML", false, emptyTemplate);
    syncHiddenInput();
  }

  function addLink() {
    const url = window.prompt("输入链接地址");
    if (!url) return;
    command("createLink", url);
  }

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = (await response.json()) as { url: string };
      focusEditor();
      document.execCommand(
        "insertHTML",
        false,
        `<figure><img src="${data.url}" alt="${file.name}"><figcaption>${file.name}</figcaption></figure>`
      );
      syncHiddenInput();
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <div className="grid gap-2">
      <input ref={inputRef} type="hidden" name={name} defaultValue={defaultValue} />
      <div className="flex flex-wrap gap-2 border border-[#1d384a]/15 bg-[#eef6fb] p-2">
        <ToolButton label="Bold" onClick={() => command("bold")}><Bold size={16} /></ToolButton>
        <ToolButton label="Italic" onClick={() => command("italic")}><Italic size={16} /></ToolButton>
        <ToolButton label="Underline" onClick={() => command("underline")}><Underline size={16} /></ToolButton>
        <ToolButton label="Heading 2" onClick={() => command("formatBlock", "h2")}><Heading2 size={16} /></ToolButton>
        <ToolButton label="Heading 3" onClick={() => command("formatBlock", "h3")}><Heading3 size={16} /></ToolButton>
        <ToolButton label="Bullet list" onClick={() => command("insertUnorderedList")}><List size={16} /></ToolButton>
        <ToolButton label="Numbered list" onClick={() => command("insertOrderedList")}><ListOrdered size={16} /></ToolButton>
        <ToolButton label="Quote" onClick={() => command("formatBlock", "blockquote")}><Quote size={16} /></ToolButton>
        <ToolButton label="Link" onClick={addLink}><LinkIcon size={16} /></ToolButton>
        <ToolButton label={uploading ? "Uploading" : "Upload image"} onClick={() => fileRef.current?.click()} disabled={uploading}>
          <ImagePlus size={16} />
        </ToolButton>
        <button
          type="button"
          onClick={insertTemplate}
          className="h-9 bg-white px-3 text-xs font-black uppercase tracking-[0.12em] text-[#1d384a] transition hover:bg-[#86edfc]"
        >
          Template
        </button>
      </div>
      <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden" onChange={handleUpload} />
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={syncHiddenInput}
        onBlur={syncHiddenInput}
        className="rich-editor min-h-72 border border-[#1d384a]/15 bg-white px-5 py-4 text-base font-semibold leading-8 outline-none focus:border-[#5ba4d7]"
        dangerouslySetInnerHTML={{ __html: defaultValue || emptyTemplate }}
      />
    </div>
  );
}

function ToolButton({
  children,
  disabled,
  label,
  onClick,
}: {
  children: ReactNode;
  disabled?: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={label}
      title={label}
      disabled={disabled}
      type="button"
      onClick={onClick}
      className="grid h-9 w-9 place-items-center bg-white text-[#1d384a] transition hover:bg-[#86edfc] disabled:opacity-45"
    >
      {children}
    </button>
  );
}
