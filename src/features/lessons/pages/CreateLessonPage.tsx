import { useState } from 'react'
import { FileText, Bold, Italic, Underline, List, Link2 } from 'lucide-react'
import Breadcrumb from '../../../shared/components/Breadcrumb'
import Button from '../../../shared/components/Button'
import Input from '../../../shared/components/Input'
import Select from '../../../shared/components/Select'
import NumberedSection from '../components/NumberedSection'
import UploadDropzone from '../components/UploadDropzone'
import ReviewSummary from '../components/ReviewSummary'
import { industries } from '../mockData'

const toolbarIcons = [Bold, Italic, Underline, List, Link2]

export default function CreateLessonPage() {
  const [title, setTitle] = useState('')
  const [projectName, setProjectName] = useState('')
  const [industry, setIndustry] = useState('')
  const [description, setDescription] = useState('')

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Create Lesson' }]} />

      <div className="mt-4 flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <FileText size={20} />
        </span>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Create Lesson</h1>
          <p className="mt-1 text-sm text-text-muted">
            Fill in the details below to create a new knowledge base lesson.
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <NumberedSection number={1} title="Basic Information">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <Input
                  label="Lesson Title *"
                  placeholder="e.g. Optimizing PLC Logic for High-Speed Packaging"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                  label="Project Name *"
                  placeholder="e.g. Line 7 Packaging Upgrade"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <Select
                label="Industry *"
                placeholder="Select Industry"
                options={industries}
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>
          </NumberedSection>

          <NumberedSection number={2} title="Lesson Content">
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-text-primary">Description *</span>
              <div className="flex items-center gap-3 rounded-t-lg border border-b-0 border-border bg-bg-card-alt px-3 py-2">
                {toolbarIcons.map((Icon, i) => (
                  <button
                    key={i}
                    type="button"
                    className="text-text-muted transition-colors hover:text-accent cursor-pointer"
                  >
                    <Icon size={15} />
                  </button>
                ))}
              </div>
              <textarea
                rows={8}
                placeholder="Write the full description of the lesson..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full resize-none rounded-b-lg border border-border bg-bg-card px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent"
              />
            </div>
          </NumberedSection>

          <NumberedSection number={3} title="Attachments">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <UploadDropzone
                  title="Click to upload or drag and drop"
                  hint="SVG, PNG, JPG or GIF (max 5MB)"
                  label="Image uploads"
                />
                <UploadDropzone
                  title="Click to upload or drag and drop"
                  hint="PDF, DOCX, or PPTX (max 5MB)"
                  label="Document uploads"
                />
              </div>
              <p className="text-xs text-text-muted">No files attached yet.</p>
            </div>
          </NumberedSection>

          <div className="flex flex-col-reverse items-stretch justify-between gap-3 sm:flex-row sm:items-center">
            <Button variant="danger-outline">Discard</Button>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="secondary">Save as Draft</Button>
              <Button variant="primary">Submit Lesson &rarr;</Button>
            </div>
          </div>
        </div>

        <div>
          <ReviewSummary
            title={title}
            projectName={projectName}
            industry={industry}
            section=""
            description={description}
            fileCount={0}
            status="Not provided"
          />
        </div>
      </div>
    </div>
  )
}
