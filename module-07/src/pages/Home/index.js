import React from 'react'
import { MdAddShoppingCart } from 'react-icons/md'
import { ProductList } from './styles'

export default function Home() {
  return (
    <ProductList>
      <li>
        <img
          src="https://imgcentauro-a.akamaihd.net/900x900/91501831/tenis-nike-revolution-4-masculino-img.jpg"
          alt="Tênis"
        />
        <strong>Tenis massa com um titulo muito grande que quebra varias linhas</strong>
        <span>R$129,90</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#FFF" />3
          </div>
          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>

      <li>
        <img
          src="https://imgcentauro-a.akamaihd.net/900x900/91501831/tenis-nike-revolution-4-masculino-img.jpg"
          alt="Tênis"
        />
        <strong>Tênis</strong>
        <span>R$129,90</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#FFF" /> 3
          </div>

          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>

      <li>
        <img
          src="https://imgcentauro-a.akamaihd.net/900x900/91501831/tenis-nike-revolution-4-masculino-img.jpg"
          alt="Tênis"
        />
        <strong>Tênis</strong>
        <span>R$129,90</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#FFF" /> 3
          </div>

          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>

      <li>
        <img
          src="https://imgcentauro-a.akamaihd.net/900x900/91501831/tenis-nike-revolution-4-masculino-img.jpg"
          alt="Tênis"
        />
        <strong>Tênis</strong>
        <span>R$129,90</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#FFF" /> 3
          </div>

          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>

      <li>
        <img
          src="https://imgcentauro-a.akamaihd.net/900x900/91501831/tenis-nike-revolution-4-masculino-img.jpg"
          alt="Tênis"
        />
        <strong>Tênis</strong>
        <span>R$129,90</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#FFF" /> 3
          </div>

          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>

      <li>
        <img
          src="https://imgcentauro-a.akamaihd.net/900x900/91501831/tenis-nike-revolution-4-masculino-img.jpg"
          alt="Tênis"
        />
        <strong>Tênis</strong>
        <span>R$129,90</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#FFF" /> 3
          </div>

          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
    </ProductList>
  )
}
