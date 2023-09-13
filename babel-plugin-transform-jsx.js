module.exports = function ({ types: t }) {
    function transformJSXElement(node) {
        if (t.isJSXElement(node)) {
            const tagName = node.openingElement.name.name;
            const children = node.children.map(child => transformJSXElement(child)).filter(Boolean); // Filter out null/undefined children
            const properties = [];

            // Handle specific attributes
            node.openingElement.attributes.forEach(attribute => {
                if (t.isJSXAttribute(attribute)) {
                    const attributeName = attribute.name.name;
                    const attributeValue = attribute.value;

                    if (t.isStringLiteral(attributeValue)) {
                        // Handle string literals
                        properties.push(t.objectProperty(t.identifier(attributeName), attributeValue));
                    } else if (t.isJSXExpressionContainer(attributeValue)) {
                        // Handle JSX expression containers (e.g., onClick={() => handleClick()})
                        properties.push(t.objectProperty(t.identifier(attributeName), attributeValue.expression));
                    }
                }
            });

            const result = t.objectExpression([
                t.objectProperty(t.identifier('type'), t.stringLiteral(tagName)),
                t.objectProperty(t.identifier('child'), t.arrayExpression(children)),
                ...properties, // Add the attribute properties
            ]);

            return result;
        } else if (t.isJSXText(node)) {
            const trimmedText = node.value.trim();
            if (trimmedText.length > 0) {
                return t.stringLiteral(trimmedText);
            }
        }
        return null;
    }

    return {
        visitor: {
            JSXElement(path) {
                const transformed = transformJSXElement(path.node);
                if (transformed) {
                    // Wrap the transformed JSX element in an array
                    path.replaceWith(t.arrayExpression([transformed]));
                }
            },
        },
    };
};
